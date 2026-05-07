const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongo;

beforeAll(async () => {
  process.env.NODE_ENV = "test";

  mongo = await MongoMemoryServer.create(); 

  const uri = mongo.getUri();
  await mongoose.connect(uri);
});

afterEach(async () => {

  const collections = mongoose.connection.collections;

  for (const key in collections) {
    await collections[key].deleteMany();
  }
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongo.stop();
});