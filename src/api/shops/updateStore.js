'use strict';

const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports.update = (evt, ctx, cb) => {
  const payLoad = evt.body;
  const {
    storeName,
    streetAddress,
    city,
    postCode,
    latitude,
    longitude
  } = JSON.parse(payLoad);

  if (
    typeof storeName != 'string' ||
    typeof streetAddress != 'string' ||
    typeof city != 'string' ||
    typeof postCode != 'string' ||
    typeof latitude != 'string' ||
    typeof longitude != 'string'
  ) {
    cb(
      new Error('Validation error make sure your fields are correctly filled')
    );
    return;
  }
  const params = {
    TableName: 'shops',
    Item: {
      id: evt.pathParameters.id,
      storeName: storeName,
      streetAddress: streetAddress,
      city: city,
      postCode: postCode,
      latitude: latitude,
      longitude: longitude
    }
  };
  dynamoDB.put(params, (err, result) => {
    if (err) {
      cb(new Error('Could not update store'));
      return;
    }

    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({ store: result.Item })
    };

    cb(null, response);
  });
};
