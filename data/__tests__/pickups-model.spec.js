const db = require("../db-config");
const seed0 = require("../seeds/00-cleanup").seed;
const seed1 = require("../seeds/01-users").seed;
const seed2 = require("../seeds/02-volunteer_accounts").seed;
const seed3 = require("../seeds/03-business_accounts").seed;
const seed4 = require("../seeds/04-pickups").seed;
const pickupsDb = require("../pickups-model");

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

describe("Updates pickups correctly", () => {
  it("updates the right pickup", async () => {
    const pickups = await db("pickups");
    const updated = await pickupsDb.update({ completed: true }, 1);
    const pickupsChanged = await db("pickups");
    expect(pickups).toMatchSnapshot();
    expect(pickupsChanged).toMatchSnapshot();
  });
});
