const fs = require('fs');
const csvFilePath = './src/api/directory.csv';
const csv = require('csvtojson');
const AWS = require('aws-sdk');
const uuid = require('uuid');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports.seedData = (evt, ctx, cb) => {
  csv()
    .fromFile(csvFilePath)
    .then((jsonObj) => {
      jsonObj.map((store) => {
        const params = {
          TableName: 'shops',
          Item: {
            id: uuid.v1(),
            brand: store['Brand'],
            storeNumber: store['Store Number'],
            ownershipType: store['Ownership Type'],
            country: store['Country'],
            timezone: store['Timezone'],
            phoneNumber: store['Phone Number'],
            storeName: store['Store Name'],
            streetAddress: store['Street Address'],
            city: store['City'],
            postCode: store['Post Code'],
            latitude: store['Latitude'],
            longitude: store['Longitude']
          }
        };

        dynamoDB.put(params).then((response) => {
          console.log(response);
          cb(null, {
            statusCode: 200,
            headers: {
              'Access-Control-Allow-Origin': '*', // Required for CORS support to work
              'Access-Control-Allow-Credentials': true // Required for cookies, authorization headers with HTTPS
            },
            body: JSON.stringify({
              message: 'succesfully saved store'
            })
          });
        });
      });
    });
};
