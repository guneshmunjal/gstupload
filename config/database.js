const { MongoClient } = require('mongodb');
const serviceAccount = require('.//serviceAccountKey.json');
require('dotenv').config();

const dbconnect = async () => {
  try {
    const client = new MongoClient(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await client.connect();
    console.log('DB connected successfully');

    // Perform further operations with the connected client

    client.close();
  } catch (error) {
    console.log('Issue in DB connection');
    console.log(error);
  }
};

module.exports = dbconnect;
