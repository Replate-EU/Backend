const db = require("./db-config");
const pickupConvert = require("./mappers");

const pickups = () => db("pickups as p");

function getNotCompleted() {
  //resolves to array of pickups where completed = false
  return pickups()
    .join("business_accounts as b", "p.business_id", "=", "b.user_id")
    .where({ completed: 0, claimed_by: null })
    .select(
      "p.id",
      "claimed_by",
      "food_type",
      "quantity",
      "pickup_time",
      "completed",
      "address",
      "business_id",
      "b.name"
    )
    .then(pickups => pickups.map(pickupConvert));
}

function getByUserId(user_id) {
  //resolves to array of all pickups associated with that user
  //converts completed field to boolean
  //all posted pickups if business
  //all claimed pickups if volunteer
  return pickups()
    .join("business_accounts as b", "p.business_id", "=", "b.user_id")
    .where({ business_id: user_id })
    .orWhere({ claimed_by: user_id })
    .select(
      "p.id",
      "claimed_by",
      "food_type",
      "quantity",
      "pickup_time",
      "completed",
      "address",
      "business_id",
      "b.name"
    )
    .then(pickups => pickups.map(pickupConvert));
}

function getById(id) {
  return pickups()
    .join("business_accounts as b", "p.business_id", "=", "b.user_id")
    .where({ id })
    .first()
    .select(
      "p.id",
      "claimed_by",
      "food_type",
      "quantity",
      "pickup_time",
      "completed",
      "address",
      "business_id",
      "b.name"
    );
}

function insert(pickup) {
  //resolves to new pickup object
  return pickups()
    .insert(pickup, "id")
    .then(([id]) => getById(id));
}

function update(pickup, id) {
  //takes in a pickup object and a pickup id
  return pickups()
    .where({ id })
    .update(pickup);
}

function remove(id) {
  //takes in a pickup id
  return pickups()
    .where({ id })
    .del();
}

module.exports = {
  getById,
  getByUserId,
  getNotCompleted,
  insert,
  update,
  remove
};
