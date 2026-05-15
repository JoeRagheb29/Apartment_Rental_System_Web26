const request = require("supertest");
const app = require("../index");

require("./setup");

describe("Relationship Endpoints", () => {

  let ownerToken;
  let tenantToken;
  let apartmentId;

  const apartmentData = {
    City: "Cairo",
    NumberOfRooms: 3,
    Area: 120,
    View: "Nile",
    ApartmentPictures: ["img1.jpg"],
    description: "Nice apartment",
    price: 5000,
    location: "Zamalek"
  };

  beforeAll(async () => {

    // OWNER
    await request(app)
      .post("/api/auth/register")
      .send({
        name: "owner",
        email: "owner2@test.com",
        password: "123456",
        role: "owner"
      });

    const ownerLogin = await request(app)
      .post("/api/auth/login")
      .send({
        email: "owner2@test.com",
        password: "123456",
        role: "owner"
      });

    ownerToken = ownerLogin.body.token;

    // TENANT
    await request(app)
      .post("/api/auth/register")
      .send({
        name: "tenant",
        email: "tenant2@test.com",
        password: "123456",
        role: "tenant"
      });

    const tenantLogin = await request(app)
      .post("/api/auth/login")
      .send({
        email: "tenant2@test.com",
        password: "123456",
        role: "tenant"
      });

    tenantToken = tenantLogin.body.token;

  });

  beforeEach(async () => {

    const res = await request(app)
      .post("/api/apartments")
      .set("Authorization", `Bearer ${ownerToken}`)
      .send(apartmentData);

    apartmentId = res.body._id;

  });

  it("should create apartment", async () => {

    const res = await request(app)
      .post("/api/apartments")
      .set("Authorization", `Bearer ${ownerToken}`)
      .send(apartmentData);

    expect(res.statusCode).toBe(201);

  });

  it("should get apartment by ID", async () => {

    const res = await request(app)
      .get(`/api/apartments/${apartmentId}`);

    expect(res.statusCode).toBe(200);

  });

  it("should update apartment", async () => {

    const res = await request(app)
      .put(`/api/apartments/${apartmentId}`)
      .set("Authorization", `Bearer ${ownerToken}`)
      .send({
        price: 7000
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.price).toBe(7000);

  });

  it("should delete apartment", async () => {

    const res = await request(app)
      .delete(`/api/apartments/${apartmentId}`)
      .set("Authorization", `Bearer ${ownerToken}`);

    expect(res.statusCode).toBe(200);

  });

  it("should rent apartment", async () => {

    const res = await request(app)
      .post(`/api/apartments/${apartmentId}/rent`)
      .set("Authorization", `Bearer ${tenantToken}`);

    expect(res.statusCode).toBe(200);

  });

  it("should cancel rental", async () => {

    await request(app)
      .post(`/api/apartments/${apartmentId}/rent`)
      .set("Authorization", `Bearer ${tenantToken}`);

    const res = await request(app)
      .delete(`/api/apartments/${apartmentId}/rent`)
      .set("Authorization", `Bearer ${tenantToken}`);

    expect(res.statusCode).toBe(200);

  });

});