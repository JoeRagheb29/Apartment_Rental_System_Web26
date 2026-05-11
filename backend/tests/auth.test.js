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
it("should fail login with wrong password", async () => {

  await request(app)
    .post("/api/auth/register")
    .send({
      name: "Test",
      email: "wrongpass@test.com",
      password: "123456",
      role: "tenant"
    });

  const res = await request(app)
    .post("/api/auth/login")
    .send({
      email: "wrongpass@test.com",
      password: "wrongpassword"
    });

  expect(res.statusCode).toBe(400);

});
it("should fail register duplicate email", async () => {

  await request(app)
    .post("/api/auth/register")
    .send({
      name: "test",
      email: "duplicate@test.com",
      password: "123456",
      role: "owner"
    });

  const res = await request(app)
    .post("/api/auth/register")
    .send({
      name: "test2",
      email: "duplicate@test.com",
      password: "123456",
      role: "owner"
    });

  expect(res.statusCode).not.toBe(201);

});
it("should upload profile picture", async () => {

    const register = await request(app)
        .post("/api/auth/register")
        .send({
            name: "Mohamed",
            email: "m@test.com",
            password: "123456",
            role: "tenant"
        });

    const login = await request(app)
        .post("/api/auth/login")
        .send({
            email: "m@test.com",
            password: "123456"
        });

    const cookie = login.headers["set-cookie"];

    const res = await request(app)
        .post("/api/auth/upload-profile-picture")
        .set("Cookie", cookie[0])
        .attach(
            "image",
            "tests/test-image.jpg"
        );

    expect(res.statusCode).toBe(200);

    expect(res.body.image)
        .toContain("/uploads/profile/");

    expect(res.body.user.ProfilePicture)
        .toContain("/uploads/profile/");

});
it("should fail upload non image", async () => {

    await request(app)
        .post("/api/auth/register")
        .send({
            name: "Mohamed",
            email: "testupload@test.com",
            password: "123456",
            role: "tenant"
        });

    const login = await request(app)
        .post("/api/auth/login")
        .send({
            email: "testupload@test.com",
            password: "123456"
        });

    const cookie = login.headers["set-cookie"];

    const res = await request(app)
        .post("/api/auth/upload-profile-picture")
        .set("Cookie", cookie[0])
        .attach(
            "image",
            "package.json"
        );

    expect(res.statusCode).toBe(500);

});