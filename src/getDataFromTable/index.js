const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const params = {
    TableName: process.env.TABLE_NAME
  };

  let items;
  let entries = [];

  try {
    items = await dynamodb.scan(params).promise();
    items.Items.forEach((item) => entries.push(item));
    console.log(`Getting data from table ${process.env.TABLE_NAME} in the cloud!`);
  } catch (error) {
    console.log(error);
  }

  const output = entries.map(item => item.content).join("\n");
  process.stdout.write(output);

  return 'Ok!'
};
