const db = require("./db-config");

function getByIdAndType(user_id, type) {
  return db(`${type}_accounts`)
    .where({ user_id })
    .first();
}

function insert(details, type) {
  //takes in details and user type, resolves to 1 on success
  return db(`${type}_accounts`).insert(details);
}

function update(details, type, user_id) {
  //takes in details, user id, and user type, resolves to 1 on success
  db(`${type}_accounts`)
    .where({ user_id })
    .insert(details);
}

function remove(type, user_id) {
  db(`${type}_accounts`)
    .where({ user_id })
    .del();
}

module.exports = {
  insert,
  update,
  remove,
  getByIdAndType
};
