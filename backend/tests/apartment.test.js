const request = require("supertest");
const app = require("../index");

require("./setup");

describe("Apartment Endpoints", () => {

  let cookie;
  let apartmentId;
  let tenantCookie;

  const user = {
    name: "Owner",
    email: "owner@test.com",
    password: "123456",
    role: "owner"
  };

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

    await request(app)
      .post("/api/auth/register")
      .send(user);

    const loginRes = await request(app)
      .post("/api/auth/login")
      .send({
        email: user.email,
        password: user.password
      });

    cookie = loginRes.headers["set-cookie"];

    await request(app)
      .post("/api/auth/register")
      .send({
        name: "tenant",
        email: "tenant@test.com",
        password: "123456",
        role: "tenant"
      });

    const tenantLogin = await request(app)
      .post("/api/auth/login")
      .send({
        email: "tenant@test.com",
        password: "123456"
      });

    tenantCookie = tenantLogin.headers["set-cookie"];

  });

  beforeEach(async () => {

    const res = await request(app)
      .post("/api/apartments")
      .set("Cookie", cookie[0])
      .send(apartmentData);

    apartmentId = res.body._id;

  });

  it("should create apartment", async () => {

    const res = await request(app)
      .post("/api/apartments")
      .set("Cookie", cookie[0])
      .send({
        ...apartmentData,
        City: "Alexandria"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.City).toBe("Alexandria");

  });

  it("should get all apartments", async () => {

    const res = await request(app)
      .get("/api/apartments");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);

  });

  it("should get apartment by ID", async () => {

    const res = await request(app)
      .get(`/api/apartments/${apartmentId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(apartmentId);

  });

  it("should update apartment", async () => {

    const res = await request(app)
      .put(`/api/apartments/${apartmentId}`)
      .set("Cookie", cookie[0])
      .send({
        price: 6000
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.price).toBe(6000);

  });

  it("should delete apartment", async () => {

    const res = await request(app)
      .delete(`/api/apartments/${apartmentId}`)
      .set("Cookie", cookie[0]);

    expect(res.statusCode).toBe(200);

    expect(res.body.message)
      .toBe("Apartment deleted successfully");

  });

  it("should search apartments by city", async () => {

    const res = await request(app)
      .get("/api/apartments/search?city=Cairo");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);

  });

  it("should search apartments by rooms", async () => {

    const res = await request(app)
      .get("/api/apartments/search/rooms?rooms=3");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);

  });

  it("should include apartment images", async () => {

    const res = await request(app)
      .get(`/api/apartments/${apartmentId}`);

    expect(res.body.ApartmentPictures).toBeDefined();
    expect(Array.isArray(res.body.ApartmentPictures)).toBe(true);

  });

  it("should fail create apartment without token", async () => {

    const res = await request(app)
      .post("/api/apartments")
      .send(apartmentData);

    expect(res.statusCode).toBe(401);

  });

  it("should prevent tenant from creating apartment", async () => {

    const res = await request(app)
      .post("/api/apartments")
      .set("Cookie", tenantCookie[0])
      .send(apartmentData);

    expect(res.statusCode).toBe(403);

  });

  it("should return 404 for non existing apartment", async () => {

    const fakeId = "507f1f77bcf86cd799439011";

    const res = await request(app)
      .get(`/api/apartments/${fakeId}`);

    expect(res.statusCode).toBe(404);

  });

  it("should return 500 for invalid apartment id", async () => {

    const res = await request(app)
      .get("/api/apartments/invalid-id");

    expect(res.statusCode).toBe(500);

  });

  it("should fail if apartment already rented", async () => {

    await request(app)
      .post(`/api/apartments/${apartmentId}/rent`)
      .set("Cookie", tenantCookie[0]);

    const res = await request(app)
      .post(`/api/apartments/${apartmentId}/rent`)
      .set("Cookie", tenantCookie[0]);

    expect(res.statusCode).toBe(400);

  });

  it("should cancel apartment rental", async () => {

    await request(app)
      .post(`/api/apartments/${apartmentId}/rent`)
      .set("Cookie", tenantCookie[0]);

    const res = await request(app)
      .delete(`/api/apartments/${apartmentId}/rent`)
      .set("Cookie", tenantCookie[0]);

    expect(res.statusCode).toBe(200);

    expect(res.body.message)
      .toBe("Rental cancelled successfully");

  });

});