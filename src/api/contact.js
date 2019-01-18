'use strict';

const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const uuid = require('uuid');

module.exports.contact = (evt, ctx, cb) => {
  const payLoad = evt.body;
  const { Name, Age, Email } = JSON.parse(payLoad);

  if (
    typeof Name != 'string' ||
    typeof Age != 'string' ||
    typeof Email != 'string'
  ) {
    cb(
      new Error('Validation error make sure your fields are correctly filled')
    );
    return;
  }
  const params = {
    TableName: 'contacts',
    Item: {
      id: uuid.v1(),
      Name: Name,
      Age: Age,
      Email: Email
    }
  };
  dynamoDB.put(params, (err, result) => {
    if (err) {
      cb(new Error('Could save'));
      return;
    }

    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({ contact: result.Item })
    };

    cb(null, response);
  });
};
