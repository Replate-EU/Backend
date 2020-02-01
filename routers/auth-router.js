const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("../data/users-model");

function createToken(user) {
  const payload = {
    sub: user.id,
    username: user.username,
    user_type: user.user_type
  };
  const options = {
    expiresIn: "1d"
  };
  const secret = process.env.JWT_SECRET || "replate-build-week-secret-code";

  const token = jwt.sign(payload, secret, options);

  return token;
}

router.post("/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 12);
  user.password = hash;

  Users.insert(user)
    .then(saved => {
      res
        .status(201)
        .json({ saved, message: "new user successfully registered" });
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "could not register with provided details" });
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  Users.getByUsername(username)
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = createToken(user);
        res.status(200).json({ token });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "failed to log in" });
    });
});

module.exports = router;
