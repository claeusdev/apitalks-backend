const fs = require('fs');
const csvFilePath = './src/api/directory.csv';
const csv = require('fast-csv');
const AWS = require('aws-sdk');
const uuid = require('uuid');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports.seedData = (evt, ctx, cb) => {
  csv
    .fromPath(csvFilePath, {
      headers: true,
      ignoreEmpty: true
    })
    .on('data', function(data) {
      for (var value in data) {
        if (data.hasOwnProperty(value)) {
          if (data[value] === '') {
            data[value] = 'N/A';
          }
        }

        params = {
          TableName: 'shops',
          Item: {
            id: uuid.v1(),
            brand: data['Brand'] || "N/A",
            storeNumber: data['Store Number'] || "N/A",
            ownershipType: data['Ownership Type'] || "N/A",
            country: data['Country'] || "N/A",
            timezone: data['Timezone'] || "N/A",
            phoneNumber: data['Phone Number'] || "N/A",
            storeName: data['Store Name'] || "N/A",
            streetAddress: data['Street Address'] || "N/A",
            city: data['City'] || "N/A",
            postCode: data['Postcode'] || "N/A",
            latitude: data['Latitude'] || "N/A",
            longitude: data['Longitude' || "N/A"]
            //lots of other data
          }
        };
        dynamoDB.put(params, function(err, data) {
          if (err) {
            console.error(
              'Unable to add item. Error JSON:',
              JSON.stringify(err, null, 2)
            );
          } else {
            console.log('Added item:', JSON.stringify(data, null, 2));
          }
        });
      }
    })
    .on('end', function() {
      console.log('done');
    });
};
