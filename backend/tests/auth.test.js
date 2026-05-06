const request = require("supertest");
const app = require("../index");

require("./setup");

describe("Auth Endpoints", () => {

  it("should register a new user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Mohamed",
        email: "mohamed@test.com",
        password: "123456",
        role: "tenant"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.email).toBe("mohamed@test.com");
  });

  it("should fail if email is missing", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Mohamed",
        password: "123456"
      });

    expect(res.statusCode).toBe(400);
  });

  it("should login successfully", async () => {
    await request(app).post("/api/auth/register").send({
      name: "Mohamed",
      email: "login@test.com",
      password: "123456"
    });

    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "login@test.com",
        password: "123456"
      });

    expect(res.statusCode).toBe(200);
    expect(res.headers["set-cookie"]).toBeDefined();
  });

  it("should fail login with wrong password", async () => {
    await request(app).post("/api/auth/register").send({
      name: "Mohamed",
      email: "wrong@test.com",
      password: "123456"
    });

    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "wrong@test.com",
        password: "wrongpass"
      });

    expect(res.statusCode).toBe(400);
  });

  it("should logout", async () => {
    const res = await request(app).post("/api/auth/logout");

    expect(res.statusCode).toBe(200);
  });

});