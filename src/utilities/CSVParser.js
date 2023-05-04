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
  getMultipleBeneficiary,
  insertManySubscribers,
  updateBeneficiary
} = require("../services/subscriberServices");
const { insertManyBeneficiaries } = require("../services/subscriberServices");

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
    const ogSubscribers = json.filter(document => {
      if(document.relationshipToSubscriber === "self"){
        return true;
      }else{
        return false;
      }
    });
    // // getting gender
    const gender = await GenderSchema.find({});
    const allRelationShipEnum = await RelationshipToSubscriberSchema.find({});
    function returnGenderId (fieldToFilter , schemaData , fieldToQueryWith) {
      const finalFilter = schemaData.filter(genderObj => {
        if(genderObj[fieldToQueryWith] === fieldToFilter) {
          return true;
        }
      });
      return finalFilter[0]._id.toString();
    }
    // // update the gender id in all the json object
    const maleRegex = /^[Mm]ale$/;
    function replaceIds (mainInfoArray) {
       const genderedJson = mainInfoArray.map(document => {
        if(document.gender === "m" || document.gender === "M" || maleRegex.test(document.gender)) {
          // console.log("in the male cond" , returnGenderId("male"))
          document.gender = returnGenderId("male" , gender , "backendName");
        }else{
          // console.log("in the female cond" , returnGenderId("female"))
          document.gender = returnGenderId("female" , gender , "backendName");
        }
        // replacing beneficiaries with id 
        document.relationshipToSubscriber = returnGenderId(document.relationshipToSubscriber.toLowerCase() , allRelationShipEnum , "backendName");
        return document;
      });
      return genderedJson;
    }
    const toAddBeneficiaries = replaceIds(json);
    // // now we will insert all the documents to beneficiary array
    const insertedBeneficiaries = await insertManyBeneficiaries(toAddBeneficiaries);
    // will update the beneficiaries in to the subscribers
    const updatedPayloadForSubscribers = await promise.map(ogSubscribers, async subscriberDocument => {
      // add the subscribers and when they are added get the beneficiaries for them and 
      // get the beneficiaries for each subscriber
      console.log(subscriberDocument.familyID);
        const thisFamilyBenficiaries = await getMultipleBeneficiary({familyID : subscriberDocument.familyID})
        const allIds = thisFamilyBenficiaries.map(doc => doc._id.toString());
        // updateSubscriber({_id : createdSubscriber._id} , {beneficiaries : allIds})
        subscriberDocument.beneficiaries = allIds;
        return subscriberDocument;
    })

    insertManySubscribers(updatedPayloadForSubscribers)
    .then(response => {
      return {
        success : true, 
        message : "Data is added"
      }
    })
    .catch(error => {
      return {success : false , message : error}
    })


  } catch (error) {
    return {
      success : false,
      message : error
    }
  }
}

module.exports = {
  parseCSVToJSON,
  linkToSubscribers
};