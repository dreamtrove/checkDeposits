/** Return all users SLP addresses from DynamoDB
 *
 */
require("dotenv").config();
const AWS = require("aws-sdk");

AWS.config.update({
  region: process.env.AWS_REGION
});

const docClient = new AWS.DynamoDB.DocumentClient();

module.exports.getDepositsTable = async address => {
  // Retrieve user by SLP address
  let addressData;
  try {
    var params = {
      TableName: process.env.AWS_DYNAMODB_DEPOSITS_TABLE,
      Key: {
          address: address
      }
    };
    
    addressData = await docClient.get(params).promise();

    function isEmpty(obj) {
      return Object.keys(obj).length === 0;
    }
    if (isEmpty(addressData)) return false;
  } catch (err) {
    console.log(err);
  }

  return addressData;
};

module.exports.saveToDepositsTable = async (address, userId) => {
  // Use SLP Address
  var params = {
    TableName: process.env.AWS_DYNAMODB_DEPOSITS_TABLE,
    Item: {
      address: address,
      userId: userId
    }
  };
  try {
    await docClient.put(params).promise();
  } catch (err) {
    console.log(err);
  }
};

