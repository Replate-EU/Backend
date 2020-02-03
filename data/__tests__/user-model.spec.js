/* const db = require("../db-config");
const seed1 = require("../seeds/01-users").seed;
const seed2 = require("../seeds/02-volunteer_accounts").seed;
const seed3 = require("../seeds/03-business_accounts").seed;
const seed4 = require("../seeds/04-pickups").seed;
const usersDb = require("../users-model");

const newUser = {
  username: "darragh",
  password: "12345",
  user_type: "volunteer",
  contact_number: "1-234-567-78-90"
};

beforeEach(async () => {
  await seed1(db);
  await seed2(db);
  await seed3(db);
  await seed4(db);
});

describe("Users-model", () => {
  describe("getById", () => {
    it("Returns correct data for volunteer users", async () => {
      expect(await db("users")).toMatchSnapshot();
      const volunteer = await usersDb.getById(1);
      console.log(volunteer);
      expect(volunteer).toMatchSnapshot();
    });

    it("Returns correct data for business users", async () => {
      const business = await usersDb.getById(2);
      console.log(business);
      expect(business).toMatchSnapshot();
    });
  });
  describe("insert()", () => {
    it("Inserts new users correctly", async () => {
      try {
        const user = await usersDb.insert(newUser);
        expect(user).toMatchOjbect({
          ...newUser,
          id: 3,
          account_details: undefined
        });
      } catch (error) {
        console.log(error);
      }
    });
  });
  describe("getByUsername()", () => {
    it("Returns correct data", async () => {
      const user = await usersDb.getByUsername("imhelping");
      expect(user).toMatchSnapshot();
    });
  });
  describe("update()", () => {
    it("Returns correct data", async () => {
      const user = await usersDb.update(newUser, 1);
      expect(user).toMatchSnapshot();
    });
  });
  describe("remove()", () => {
    it("Deletes correct user", async () => {
      const userDeleted = await usersDb.remove(1);
      expect(userDeleted).toBe(1);
      const checkForDeleted = await db("users")
        .where("id", 1)
        .first();
      expect(checkForDeleted).not.toBeDefined();
    });
  });
});
 */