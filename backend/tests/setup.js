const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
jest.setTimeout(30000);
let mongo;

beforeAll(async () => {

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

  await mongoose.connection.dropDatabase();

  await mongoose.connection.close();

  if (mongo) {
    await mongo.stop();
  }

});