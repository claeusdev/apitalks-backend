'use strict';

const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports.getStore = (evt, ctx, cb) => {
  const params = {
    TableName: 'shops',
    Key: {
      id: evt.pathParameters.id
    }
  };
  dynamoDB.get(params, (err, result) => {
    if (err) {
      console.error(err);
      cb(new Error('COuld not fetch this store.'));

      return;
    }

    const res = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // Required for CORS support to work
        'Access-Control-Allow-Credentials': true // Required for cookies, authorization headers with HTTPS
      },
      body: JSON.stringify({ store: result.Item })
    };

    cb(null, res);
  });
};
