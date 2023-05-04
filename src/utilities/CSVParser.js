const RelationshipToSubscriberSchema = require("../schemas/relationshipToSubscriberEnumSchema");
const GenderSchema = require("../schemas/genderEnumSchema");
const stream = require('stream');
// const csv = require('csv-parser');
const csv = require('fast-csv');
const promise = require("bluebird");
const {
  createSubscriber,
  createBeneficiaries,
  updateSubscriber,
  getBeneficiary,
  getMultipleBeneficiary
} = require("../services/subscriberServices");

function parseCSVToJSON(csvBuffer) {
  return new Promise((resolve, reject) => {
    const result = []; // declare the result array
    // create a read stream from the buffer
    const bufferStream = new stream.PassThrough();
    bufferStream.end(csvBuffer.toString('utf8'));
    //   bufferStream.end(csvBuffer);

    // pipe the buffer stream through the CSV parser and into a JSON transform stream
    const csvStream = csv.parse({
        headers: true,
        quoteColumns: true
      })
      //   bufferStream.pipe(csv())
      .on('data', (data) => {
        // for each row of CSV data, add it to the result array
        result.push(data);
      })
      .on('end', () => {
        // when parsing is complete, resolve the promise with the result array
        resolve(result);
      })
      .on('error', (error) => {
        // if an error occurs during parsing, reject the promise with the error
        reject(error);
      });
    bufferStream.pipe(csvStream);
  });
}

async function linkToSubscribers(json) {
  try {
    function groupByFamilyId(arr) {
      const result = {};
      arr.forEach(obj => {
        if (!result[obj.familyID]) {
          result[obj.familyID] = [];
        }
        result[obj.familyID].push(obj);
      });
      return result;
    }
    //   custom sorting function which will sort the document with self on first position
    function customSelfSorting(a, b) {
      if (a.relationshipToSubscriber === "self") {
        return 1;
      } else if (b.relationshipToSubscriber === "self") {
        return -1;
      } else {
        return 0;
      }
    }
    // this returns the object with key as familyId and value as the array of objects of same family id
    const groupedDocuments = groupByFamilyId(json);
    for (let key in groupedDocuments) {
      const sortedValue = groupedDocuments[key].sort(customSelfSorting);
      groupedDocuments[key] = sortedValue;
      // removing the documents if they are unvalid
      if (key === "" || !key) delete groupedDocuments[key];
      // making the relationship to subscriber lowercase
      if (groupedDocuments[key]) {
        // await promise.map(groupedDocuments[key] , async element => {
        // })
        groupedDocuments[key].forEach(async element => {
          if (element?.relationshipToSubscriber) {
            element.relationshipToSubscriber = element.relationshipToSubscriber.toLowerCase();
          }
          // need to check if the gender if it is M / F, will convert it to male and female then will add the details to 
          if(element?.gender) {
            element.gender = (element?.gender === "m" || element?.gender === "M") ? "male" : "female";
          }
        });
      }
    }
    // updating the gender object id in all the documents.
    for ( let key in groupedDocuments) {
      // await promise.map(groupedDocuments[key] , async document => {
        groupedDocuments[key].forEach(async document =>{
        const genderEnum = await GenderSchema.findOne({backendName : document.gender});
        if(genderEnum) {
          document.gender = genderEnum._id.toString();
        }
      })
    }
    
    //  I have got the objects with key value pair and now I will loop through the object and find for self in relationshipToSubscriber.. 
    // if self is found that is the subscriber and for remaining values I will create the object in   
    // console.log(groupedDocuments);


    // for ( let key in groupedDocuments) {
        async function createEntries (document) {
          try{
            await promise.each(document , async eachBenef => {
              if(eachBenef.relationshipToSubscriber === "self") {
                const rtsDetails = await RelationshipToSubscriberSchema.findOne({backendName : eachBenef.relationshipToSubscriber.toLowerCase()});
                // make the entry in subscriber
                eachBenef.relationshipToSubscriber = rtsDetails?._id;
                const createdSubscriber = await createSubscriber(eachBenef);
                // updating subscribers with beneficiary
                const thisFamilyBenficiaries = await getMultipleBeneficiary({familyID : eachBenef.familyID})
                const allIds = thisFamilyBenficiaries.map(doc => doc._id.toString());
                updateSubscriber({_id : createdSubscriber._id} , {beneficiaries : allIds})
                .then(async () => {
                  await createBeneficiaries(eachBenef);
                }).catch(() => {});
              }else{
                const rtsDetails = await RelationshipToSubscriberSchema.findOne({backendName : eachBenef.relationshipToSubscriber.toLowerCase()});
                eachBenef.relationshipToSubscriber = rtsDetails?._id;
                await createBeneficiaries(eachBenef);
              }
            })
          }catch(error) {
            console.log("error in the main createEntry function " , error);
            return error;
          }
        }
    
  return promise.each(Object.values(groupedDocuments) , createEntries)
    .then(() => {
      return [];
    })
    .catch(error => {
      return error;
    })

  } catch (error) {
    return false;
  }
}

module.exports = {
  parseCSVToJSON,
  linkToSubscribers
};