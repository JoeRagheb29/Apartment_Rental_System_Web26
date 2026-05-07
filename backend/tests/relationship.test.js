const request = require("supertest");
const app = require("../index");

require("./setup");

describe("Apartment Endpoints", () => {

  let cookie;

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
      .send({
        name: "owner",
        email: "owner@test.com",
        password: "123456",
        role: "owner"
      });

    const login = await request(app)
      .post("/api/auth/login")
      .send({
        email: "owner@test.com",
        password: "123456"
      });

    cookie = login.headers["set-cookie"];

  });

  it("should create apartment", async () => {

    const res = await request(app)
      .post("/api/apartments")
      .set("Cookie", cookie[0])
      .send(apartmentData);

    expect(res.statusCode).toBe(201);

  });

  it("should get all apartments", async () => {

    const res = await request(app)
      .get("/api/apartments");

    expect(res.statusCode).toBe(200);

  });

  it("should get apartment by ID", async () => {

    const create = await request(app)
      .post("/api/apartments")
      .set("Cookie", cookie[0])
      .send(apartmentData);

    const res = await request(app)
      .get(`/api/apartments/${create.body._id}`);

    expect(res.statusCode).toBe(200);

  });

  it("should update apartment", async () => {

    const create = await request(app)
      .post("/api/apartments")
      .set("Cookie", cookie[0])
      .send(apartmentData);

    const res = await request(app)
      .put(`/api/apartments/${create.body._id}`)
      .set("Cookie", cookie[0])
      .send({ price: 6000 });

    expect(res.statusCode).toBe(200);
    expect(res.body.price).toBe(6000);

  });

  it("should delete apartment", async () => {

    const create = await request(app)
      .post("/api/apartments")
      .set("Cookie", cookie[0])
      .send(apartmentData);

    const res = await request(app)
      .delete(`/api/apartments/${create.body._id}`)
      .set("Cookie", cookie[0]);

    expect(res.statusCode).toBe(200);

  });

  it("should search by city", async () => {

    await request(app)
      .post("/api/apartments")
      .set("Cookie", cookie[0])
      .send(apartmentData);

    const res = await request(app)
      .get("/api/apartments/search?city=Cairo");

    expect(res.statusCode).toBe(200);

  });

  it("should include apartment images", async () => {

    const res = await request(app)
      .post("/api/apartments")
      .set("Cookie", cookie[0])
      .send(apartmentData);

    expect(res.body.ApartmentPictures.length).toBeGreaterThan(0);

  });

});