const request = require("supertest");
const app = require("../index");

require("./setup");

describe("Relationship Endpoints", () => {

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

  // REQUIRED FIELDS
  floorNumber: 3,
  totalFloors: 10
};

  beforeAll(async () => {

    // OWNER REGISTER
    await request(app)
      .post("/api/auth/register")
      .send({
        name: "owner",
        email: "owner2@test.com",
        password: "123456",
        role: "owner"
      });

    // OWNER LOGIN
    const ownerLogin = await request(app)
      .post("/api/auth/login")
      .send({
        email: "owner2@test.com",
        password: "123456"
      });

    ownerToken = ownerLogin.body.token;

    // TENANT REGISTER
    await request(app)
      .post("/api/auth/register")
      .send({
        name: "tenant",
        email: "tenant2@test.com",
        password: "123456",
        role: "tenant"
      });

    // TENANT LOGIN
    const tenantLogin = await request(app)
      .post("/api/auth/login")
      .send({
        email: "tenant2@test.com",
        password: "123456"
      });

    tenantToken = tenantLogin.body.token;

  });

  beforeEach(async () => {

    const res = await request(app)
      .post("/api/apartments")
      .set("Authorization", `Bearer ${ownerToken}`)
      .send(apartmentData);

    console.log("CREATE:", res.body);

    apartmentId = res.body._id;

  });

  it("should create apartment", async () => {

    const res = await request(app)
      .post("/api/apartments")
      .set("Authorization", `Bearer ${ownerToken}`)
      .send(apartmentData);

    console.log(res.body);

    expect(res.statusCode).toBe(201);

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
        price: 7000
      });

    console.log(res.body);

    expect(res.statusCode).toBe(200);
    expect(res.body.price).toBe(7000);

  });

  it("should delete apartment", async () => {

    const res = await request(app)
      .delete(`/api/apartments/${apartmentId}`)
      .set("Authorization", `Bearer ${ownerToken}`);

    console.log(res.body);

    expect(res.statusCode).toBe(200);

  });

  it("should rent apartment", async () => {

    const res = await request(app)
      .post(`/api/apartments/${apartmentId}/rent`)
      .set("Authorization", `Bearer ${tenantToken}`);

    console.log(res.body);

    expect(res.statusCode).toBe(200);

  });

  it("should cancel rental", async () => {

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