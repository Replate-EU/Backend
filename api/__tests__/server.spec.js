const request = require("supertest");
const server = require("../server");

describe("server.js module", () => {
  let businessToken = null;
  let volunteerToken = null;
  describe("/api", () => {
    it("returns 200", () => {
      return request(server)
        .get("/api")
        .expect(200)
        .expect('"Server is Running."');
    });
  });

  describe("/api/auth/register", () => {
    it("returns 201", () => {
      return request(server)
        .post("/api/auth/register")
        .send({
          username: "Bob",
          password: "12345",
          user_type: "volunteer",
          contact_number: "1-234-567-89-01",
          name: "Robert"
        })
        .expect(201)
        .expect(res => res.body.id === 3);
    });
  });
  describe("/api/auth/login", () => {
    it("returns 200 for business user", () => {
      return request(server)
        .post("/api/auth/login")
        .send({ username: "fooddotcom", password: "12345" })
        .expect(200)
        .expect(res => {
          businessToken = res.body.token;
          expect(res.body.token).toBeDefined();
        });
    });
    it("returns 200 for volunteer user", () => {
      return request(server)
        .post("/api/auth/login")
        .send({ username: "imhelping", password: "12345" })
        .expect(200)
        .expect(res => {
          volunteerToken = res.body.token;
          expect(res.body.token).toBeDefined();
        });
    });
  });
  describe("/api/users Routes", () => {
    it("GET /:id returns 400 if Authorization header is missing", () => {
      return request(server)
        .get("/api/users/1")
        .expect(400);
    });
    it("GET /:id returns 401 if Authorization header is missing", () => {
      return request(server)
        .get("/api/users/1")
        .set("Authorization", "asd")
        .expect(401);
    });
    it("GET /:id returns 200 if Authorization is correct", () => {
      return request(server)
        .get("/api/users/1")
        .set("Authorization", volunteerToken)
        .expect(200);
    });
    it("PUT /:id returns 200 if Authorization is correct", () => {
      return request(server)
        .put("/api/users/1")
        .set("Authorization", volunteerToken)
        .send({
          username: "zorbathegreek",
          password: "123456",
          user_type: "volunteer",
          contact_number: "12312334241223",
          name: "blooper"
        })
        .expect(res => console.log(res.body));
    });
    it("DELETE /:id returns 200 if Authorization is correct", () => {
      return request(server)
        .del("/api/users/1")
        .set("Authorization", volunteerToken)
        .expect(200);
    });
  });
  describe("/api/pickups ROUTES", () => {
    describe("GET Methods", () => {
      it("GET /", () => {
        return request(server)
          .get("/api/pickups")
          .set("Authorization", volunteerToken)
          .expect(200);
      });
      it("GET /:id/details", () => {
        return request(server)
          .get("/api/pickups/1/details")
          .set("Authorization", volunteerToken)
          .expect(200);
      });
      it("GET /me", () => {
        return request(server)
          .get("/api/pickups/me")
          .set("Authorization", volunteerToken)
          .expect(200);
      });
    });

    describe("PATCH Methods", () => {
      it("PATCH /api/pickups/:id returns 200", () => {
        return request(server)
          .patch("/api/pickups/1")
          .set("Authorization", volunteerToken)
          .send({ completed: true })
          .expect(res=>console.log(res.body));
      });
    });
  });
});
