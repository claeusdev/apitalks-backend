const fs = require('fs');
const csvFilePath = './src/api/directory.csv';
const csv = require('fast-csv');
const AWS = require('aws-sdk');
const uuid = require('uuid');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports.seedData = (evt, ctx, cb) => {
  var stream = fs.createReadStream('./src/api/directory.csv');

  var csvStream = csv().on('data', function(data) {
    console.log(data[1]);
    const params = {
      TableName: 'shops',
      Item: {
        id: uuid.v1(),
        brand: store[0],
        storeNumber: store[1],
        ownershipType: store[2],
        country: store[3],
        timezone: store[4],
        phoneNumber: store[5],
        storeName: store[6],
        streetAddress: store[7],
        city: store[8],
        postCode: store[9],
        latitude: store[10],
        longitude: store[11]
      }
    };

    dynamoDB
      .put(params, (err, data) => {
        if (err) {
          console.error(err);
          cb(new Error('COuld not fetch this store.'));
          return;
        } else {
          cb(null, {
            statusCode: 200,
            headers: {
              'Access-Control-Allow-Origin': '*', // Required for CORS support to work
              'Access-Control-Allow-Credentials': true // Required for cookies, authorization headers with HTTPS
            },
            body: JSON.stringify({ store: data.Item })
          });
        }
      })
      .on('end', function() {
        console.log('done');
      });

    stream.pipe(csvStream);
  });
};
