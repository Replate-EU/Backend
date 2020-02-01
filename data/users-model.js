const db = require("./db-config");
const users = () => db("users");
/* 
USER OBJECT SCHEMA
{
    id:int,
    username: unique required string,
    password: required string
    user_type: required 'volunteer' | 'business'
    contact_number: required string
}
 */
function getById(id) {
  //resolves to user object without password
  const user = users()
    .where({ id })
    .first()
    .select("id", "username", "user_type", "contact_number");
  const user_details = db(`${user.user_type}_accounts`)
    .where({ user_id: user.id })
    .first();
  return Promise.all([user, user_details]).then(([user, user_details]) => {
    user.account_details = user_details;
    return user;
  });
}

function getByUsername(username) {
  //resolves to user object
  return users()
    .where({ username })
    .first();
}

function insert(user) {
  //resolves to user object without password
  return users()
    .insert(user)
    .then(([id]) => getById(id));
}

function update(user, id) {
  //resolves to user object
  return users()
    .where({ id })
    .update(user)
    .then(([id]) => getById(id));
}

function remove(id) {
  //resolves to 1 if succesfull and null otherwise
  return users()
    .where({ id })
    .del();
}

module.exports = {
  getById,
  getByUsername,
  insert,
  update,
  remove
};
