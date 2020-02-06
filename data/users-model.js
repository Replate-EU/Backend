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
async function getById(id) {
  //resolves to user object without password
  const user = await users()
    //get the user object from db
    .where({ id })
    .first()
    .select("id", "username", "user_type", "contact_number");
  const user_details = await db(`${user.user_type}_accounts`)
    //get user details
    .where({ user_id: user.id })
    .first();
  //append user details to user object
  user.account_details = user_details;
  return user;
}

async function getByUsername(username) {
  //resolves to user object
  const user = await users()
    //get the user object from db
    .where({ username })
    .first();
  console.log(user);

  const user_details = await db(`${user.user_type}_accounts`)
    //get user details
    .where({ user_id: user.id })
    .first();
  console.log(user_details);

  //append user details to user object
  user.account_details = user_details;
  return user;
}

function insert(user) {
  //resolves to user object without password
  return users()
    .insert(user, "id")
    .then(([id]) => getById(id));
}

async function update(user, id) {
  //resolves to user object
  await db("users")
    .where("id", id)
    .update(user);
  const updatedUser = await getById(id);
  return updatedUser;
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
