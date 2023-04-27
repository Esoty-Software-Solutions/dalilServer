const stream = require('stream');
// const csv = require('csv-parser');
const csv = require('fast-csv');
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

  module.exports = parseCSVToJSON;