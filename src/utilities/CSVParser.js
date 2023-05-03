const RelationshipToSubscriberSchema = require("../schemas/relationshipToSubscriberEnumSchema");
const stream = require('stream');
// const csv = require('csv-parser');
const csv = require('fast-csv');
const { createSubscriber, createBeneficiaries, updateSubscriber } = require("../services/subscriberServices");
function parseCSVToJSON(csvBuffer) {
    return new Promise((resolve, reject) => {
        const result = []; // declare the result array
      // create a read stream from the buffer
      const bufferStream = new stream.PassThrough();
      bufferStream.end(csvBuffer.toString('utf8'));
    //   bufferStream.end(csvBuffer);
      
      // pipe the buffer stream through the CSV parser and into a JSON transform stream
      const csvStream = csv.parse({headers : true , quoteColumns: true})
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

async function linkToSubscribers (json) {
  try{
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
    function customSelfSorting (a , b) {
        if(a.relationshipToSubscriber === "self") {
            return -1;
        }else if(b.relationshipToSubscriber === "self"){
            return 1;
        }else{
            return 0;
        }
    }
    // this returns the object with key as familyId and value as the array of objects of same family id
    const groupedDocuments = groupByFamilyId(json);
    for ( let key in groupedDocuments) {
          const sortedValue = groupedDocuments[key].sort(customSelfSorting);
          groupedDocuments[key] = sortedValue;
          if(key === "" || !key) delete groupedDocuments[key];
          if(groupedDocuments[key]){
              groupedDocuments[key].forEach(element => {
                if(element.relationshipToSubscriber) {
                    element.relationshipToSubscriber = element.relationshipToSubscriber.toLowerCase();
                }
              })
        }
                
    }
    //  I have got the objects with key value pair and now I will loop through the object and find for self in relationshipToSubscriber.. 
    // if self is found that is the subscriber and for remaining values I will create the object in   
    // console.log(groupedDocuments);
    for ( let key in groupedDocuments) {
        var subscriberId = null;
        groupedDocuments[key].forEach(async document => {
            // model data
            if(document.relationshipToSubscriber === "self") {
                const {_id : relationId} = RelationshipToSubscriberSchema.findOne({backendName : document?.relationshipToSubscriber.toLowerCase()})
                // make the entry in subscriber
                document.relationshipToSubscriber = relationId;
                const createdSubscriber = await createSubscriber(document);
                subscriberId = createdSubscriber._id;
            }else{
                const {_id : relationId} = RelationshipToSubscriberSchema.findOne({backendName : document?.relationshipToSubscriber.toLowerCase()})
                document.relationshipToSubscriber = relationId;
                // make entry in beneficiary
                // console.log(document);
                const createdBeneficiary = await createBeneficiaries(document);
                // adding the beneficiary to subscribers array
                if(subscriberId && createdBeneficiary){
                    await updateSubscriber({_id : subscriberId} , { $push : {beneficiaries : createdBeneficiary._id} });
                }
            }
        });
    }
    return true;
    }catch(error) {
      return false;
    }
}

module.exports = {parseCSVToJSON , linkToSubscribers};