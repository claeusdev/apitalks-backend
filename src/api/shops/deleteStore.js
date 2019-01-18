'use strict';

const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports.delete = (evt, ctx, cb) => {
  const params = {
    TableName: 'shops',
    Key: {
      id: evt.pathParameters.id
    }
  };
  dynamoDB.delete(params, (err) => {
    if (err) {
      cb(new Error("Couldn't remove this store"));
      return;
    }

    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // Required for CORS support to work
        'Access-Control-Allow-Credentials': true
        // Required for cookies, authorization headers with HTTPS
      },
      body: JSON.stringify({})
    };

    cb(null, response);
  });
};
