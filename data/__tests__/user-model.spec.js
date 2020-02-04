const db = require("../db-config");
const seed0 = require("../seeds/00-cleanup").seed;
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

beforeAll(() => {
  const boop = Promise.all([
    seed0(db),
    seed1(db),
    seed2(db),
    seed3(db),
    seed4(db)
  ]);
  return boop;
});

describe("Users-model", () => {
  describe("getById", () => {
    it("Returns correct data for volunteer users", async () => {
      expect(await db("users")).toMatchSnapshot();
      const volunteer = await usersDb.getById(1);
      expect(volunteer).toMatchSnapshot();
    });

    it("Returns correct data for business users", async () => {
      const business = await usersDb.getById(2);
      expect(business).toMatchSnapshot();
    });
  });
  describe("insert()", () => {
    it("Inserts new users correctly", async () => {
      const user = await usersDb.insert(newUser);
      expect(user).toMatchSnapshot();
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
      newUser.username = 'Gerard'
      const user = await usersDb.update(newUser, 3);
      expect(user).toMatchSnapshot();
    });
  });
  describe("remove()", () => {
    it("Deletes correct user", async () => {
      const userDeleted = await usersDb.remove(3);
      expect(userDeleted).toBe(1);
      const checkForDeleted = await db("users")
        .where("id", 3)
        .first();
      expect(checkForDeleted).not.toBeDefined();
    });
  });
});
