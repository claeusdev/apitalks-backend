'use strict';

const AWS = require('aws-sdk');
const uuid = require('uuid');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports.create = (evt, ctx, cb) => {
  const payLoad = evt.body;
  const {
    brand,
    storeNumber,
    storeName,
    ownershipType,
    streetAddress,
    city,
    country,
    timezone,
    postCode,
    latitude,
    longitude,
    phoneNumber
  } = JSON.parse(payLoad);

  const createStore = (store) => {
    const params = {
      TableName: 'shops',
      Item: store
    };

    return dynamoDB
      .put(params)
      .promise()
      .then((response) => store);
  };
  const storeInfo = (
    brand,
    storeNumber,
    storeName,
    ownershipType,
    streetAddress,
    city,
    country,
    timezone,
    postCode,
    latitude,
    longitude,
    phoneNumber
  ) => {
    return {
      id: uuid.v1(),
      brand: brand,
      storeNumber: storeNumber,
      ownershipType: ownershipType,
      country: country,
      timezone: timezone,
      phoneNumber: phoneNumber,
      storeName: storeName,
      streetAddress: streetAddress,
      city: city,
      postCode: postCode,
      latitude: latitude,
      longitude: longitude
    };
  };

  createStore(
    storeInfo(
      brand,
      storeNumber,
      storeName,
      ownershipType,
      streetAddress,
      city,
      country,
      timezone,
      postCode,
      latitude,
      longitude,
      phoneNumber
    )
  )
    .then((response) => {
      console.log(response);
      cb(null, {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*', // Required for CORS support to work
          'Access-Control-Allow-Credentials': true // Required for cookies, authorization headers with HTTPS
        },
        body: JSON.stringify({
          message: 'succesfully saved store',
          storeId: response.id
        })
      });
    })
    .catch((err) => {
      console.log(err);
      cb(null, {
        statusCode: 500,
        body: JSON.stringify({
          message: 'unable to save store'
        })
      });
    });
};
