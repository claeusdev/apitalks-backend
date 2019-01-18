'use strict';

const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports.getAllStores = (evt, ctx, cb) => {
  const params = {
    TableName: 'shops'
  };
  dynamoDB.scan(params, (err, result) => {
    if (err) {
      console.log(err);
      cb(new Error('Could not fetch all the stores'));
      return;
    }

    cb(null, {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // Required for CORS support to work
        'Access-Control-Allow-Credentials': true
        // Required for cookies, authorization headers with HTTPS
      },
      body: JSON.stringify({ stores: result.Items })
    });
  });
};
