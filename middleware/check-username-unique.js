const userDb = require("../data/users-model");

//Checks if there is a user with that username
module.exports = async function(req, res, next) {
  try {
    const isUsernameTaken = await userDb.getByUsername(req.body.username);
    if (isUsernameTaken) {
      res.status(409).json({ error: "This username is already taken" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};
