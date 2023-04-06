const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");

describe("Protected routes", () => {
  let token;
  let photoId;

  beforeAll(async () => {
    const userResponse = await request(app).post("/users/register").send({
      username: "testuser",
      email: "testemail@mail.com",
      password: "testpassword",
    });

    const loginResponse = await request(app)
      .post("/users/login")
      .send({ email: "testemail@mail.com", password: "testpassword" });

    token = loginResponse.body;
  });

  const photoDetails = {
    title: "test title",
    caption: "test caption",
    image_url: "test image url",
  };

  describe("POST /photos", () => {
    it("should return 201 status code if the photo is successfully created", async () => {
      const res = await request(app)
        .post("/photos")
        .set("token", token)
        .send(photoDetails);
      photoId = res.body.id;
      expect(res.statusCode).toEqual(201);
      expect(typeof res.body).toEqual("object");
      expect(res.body).toHaveProperty("id");
      expect(res.body).toHaveProperty("title");
      expect(res.body).toHaveProperty("caption");
      expect(res.body).toHaveProperty("image_url");
      expect(res.body).toHaveProperty("UserId");
      expect(res.body).toHaveProperty("createdAt");
      expect(res.body).toHaveProperty("updatedAt");
    });
  });

  describe("POST /photos", () => {
    it("should return a 401 error if there is no authentication", async () => {
      const res = await request(app).post("/photos").send(photoDetails);
      expect(res.statusCode).toEqual(401);
      expect(res.body).toHaveProperty("name");
      expect(res.body.name).toEqual("JsonWebTokenError");
      expect(res.body).toHaveProperty("message");
      expect(res.body.message).toEqual("jwt must be provided");
    });
  });

  describe("GET /photos", () => {
    it("should return all the photos if there is authentication", async () => {
      const res = await request(app).get("/photos").set("token", token);
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBeTruthy();
      const photo = res.body[0];
      expect(photo).toHaveProperty("id");
      expect(photo).toHaveProperty("title");
      expect(photo).toHaveProperty("caption");
      expect(photo).toHaveProperty("image_url");
      expect(photo).toHaveProperty("UserId");
      expect(photo).toHaveProperty("createdAt");
      expect(photo).toHaveProperty("updatedAt");
      expect(photo).toHaveProperty("User");
    });
  });

  describe("GET /photos", () => {
    it("should return a 401 error if there is no authentication", async () => {
      const res = await request(app).get("/photos");
      expect(res.statusCode).toEqual(401);
      expect(res.body).toHaveProperty("name");
      expect(res.body.name).toEqual("JsonWebTokenError");
      expect(res.body).toHaveProperty("message");
      expect(res.body.message).toEqual("jwt must be provided");
    });
  });

  describe("GET /photos/:id", () => {
    it("should return a photo with specified id", async () => {
      const res = await request(app)
        .get(`/photos/${photoId}`)
        .set("token", token);
      expect(res.statusCode).toEqual(200);
      expect(typeof res.body).toEqual("object");
      expect(res.body).toHaveProperty("id");
      expect(res.body).toHaveProperty("title");
      expect(res.body).toHaveProperty("caption");
      expect(res.body).toHaveProperty("image_url");
      expect(res.body).toHaveProperty("UserId");
      expect(res.body).toHaveProperty("createdAt");
      expect(res.body).toHaveProperty("updatedAt");
    });
  });

  describe("GET /photos/:id", () => {
    it("should return 404 if no photo with specified id", async () => {
      const res = await request(app).get("/photos/23456").set("token", token);
      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty("message");
      expect(res.body.message).toEqual("Photo not found");
    });
  });

  afterAll(async () => {
    await sequelize.queryInterface.bulkDelete("Photos", null, {});
    await sequelize.queryInterface.bulkDelete("Users", null, {});
    await sequelize.close();
  });
});
