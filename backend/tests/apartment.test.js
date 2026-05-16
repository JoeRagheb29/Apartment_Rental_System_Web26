const request = require("supertest");
const app = require("../index");

require("./setup");

describe("Apartment Endpoints", () => {

  let ownerToken;
  let tenantToken;
  let apartmentId;

const apartmentData = {
  Title: "Luxury Apartment",
  City: "Cairo",
  NumberOfRooms: 3,
  Area: 120,
  View: "Nile",
  ApartmentPictures: ["img1.jpg"],
  description: "Nice apartment",
  price: 5000,
  location: "Zamalek",

  floorNumber: 3,
  totalFloors: 10
};

  beforeAll(async () => {

    // OWNER REGISTER
    await request(app)
      .post("/api/auth/register")
      .send({
        name: "owner",
        email: "owner@test.com",
        password: "123456",
        role: "owner"
      });

    // OWNER LOGIN
    const ownerLogin = await request(app)
      .post("/api/auth/login")
      .send({
        email: "owner@test.com",
        password: "123456"
      });

    ownerToken = ownerLogin.body.token;

    // TENANT REGISTER
    await request(app)
      .post("/api/auth/register")
      .send({
        name: "tenant",
        email: "tenant@test.com",
        password: "123456",
        role: "tenant"
      });

    // TENANT LOGIN
    const tenantLogin = await request(app)
      .post("/api/auth/login")
      .send({
        email: "tenant@test.com",
        password: "123456"
      });

    tenantToken = tenantLogin.body.token;

  });

  beforeEach(async () => {

    const res = await request(app)
      .post("/api/apartments")
      .set("Authorization", `Bearer ${ownerToken}`)
      .send(apartmentData);

    // DEBUG
    console.log("CREATE APARTMENT RESPONSE:", res.body);

    apartmentId = res.body._id;

  });

  it("should create apartment", async () => {

    const res = await request(app)
      .post("/api/apartments")
      .set("Authorization", `Bearer ${ownerToken}`)
      .send({
        ...apartmentData,
        City: "Alex"
      });

    console.log(res.body);

    expect(res.statusCode).toBe(201);

  });

  it("should get all apartments", async () => {

    const res = await request(app)
      .get("/api/apartments");

    expect(res.statusCode).toBe(200);

  });

  it("should get apartment by ID", async () => {

    const res = await request(app)
      .get(`/api/apartments/${apartmentId}`);

    console.log(res.body);

    expect(res.statusCode).toBe(200);

  });

  it("should update apartment", async () => {

    const res = await request(app)
      .put(`/api/apartments/${apartmentId}`)
      .set("Authorization", `Bearer ${ownerToken}`)
      .send({
        price: 6000
      });

    console.log(res.body);

    expect(res.statusCode).toBe(200);
    expect(res.body.price).toBe(6000);

  });

  it("should delete apartment", async () => {

    const res = await request(app)
      .delete(`/api/apartments/${apartmentId}`)
      .set("Authorization", `Bearer ${ownerToken}`);

    console.log(res.body);

    expect(res.statusCode).toBe(200);

  });

  it("should search apartments by city", async () => {

    const res = await request(app)
      .get("/api/apartments/search?city=Cairo");

    expect(res.statusCode).toBe(200);

  });

  it("should search apartments by rooms", async () => {

    const res = await request(app)
      .get("/api/apartments/search/rooms?rooms=3");

    expect(res.statusCode).toBe(200);

  });

  it("should prevent tenant from creating apartment", async () => {

    const res = await request(app)
      .post("/api/apartments")
      .set("Authorization", `Bearer ${tenantToken}`)
      .send(apartmentData);

    expect(res.statusCode).toBe(403);

  });

  it("should rent apartment", async () => {

    const res = await request(app)
      .post(`/api/apartments/${apartmentId}/rent`)
      .set("Authorization", `Bearer ${tenantToken}`);

    console.log(res.body);

    expect(res.statusCode).toBe(200);

  });

  it("should cancel apartment rental", async () => {

    await request(app)
      .post(`/api/apartments/${apartmentId}/rent`)
      .set("Authorization", `Bearer ${tenantToken}`);

    const res = await request(app)
      .delete(`/api/apartments/${apartmentId}/rent`)
      .set("Authorization", `Bearer ${tenantToken}`);

    console.log(res.body);

    expect(res.statusCode).toBe(200);

  });

});