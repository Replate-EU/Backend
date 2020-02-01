const db = require("./db-config");
const pickupConvert = require("./mappers");

const pickups = () => db("pickups");

function getNotCompleted() {
  //resolves to array of pickups where completed = false
  return pickups()
    .where({ completed: 0 })
    .then(pickups => pickups.map(pickupConvert));
}

function getByUserId(user_id) {
  //resolves to array of all pickups associated with that user
  //converts completed field to boolean
  //all posted pickups if business
  //all claimed pickups if volunteer
  return pickups()
    .where({ business_id: user_id })
    .orWhere({ claimed_by: user_id })
    .then(pickups => pickups.map(pickupConvert));
}

function getById(id) {
  return pickups()
    .where({ id })
    .first();
}

function insert(pickup) {
  //resolves to new pickup object
  return pickups()
    .insert(pickup)
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
