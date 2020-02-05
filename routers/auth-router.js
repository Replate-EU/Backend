const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const checkToken = require("../middleware/checkToken");
const Users = require("../data/users-model");
const UserDetails = require("../data/user-details");
const Validate = require("../middleware/validation");

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

router.post("/register", Validate.validateRegister, (req, res) => {
  let register_info = req.body;
  let user = {
    username: register_info.username,
    password: register_info.password,
    user_type: register_info.user_type,
    contact_number: register_info.contact_number
  };
  let account = {};
  if (register_info.user_type == "volunteer") {
    account = {
      name: register_info.name
    };
  } else {
    account = {
      name: register_info.name,
      address: register_info.address
    };
  }
  const hash = bcrypt.hashSync(user.password, 12);
  user.password = hash;

  Users.insert(user)
    .then(newUser => {
      account.user_id = newUser.id;
      UserDetails.insert(account, newUser.user_type).then(data => {
        Users.getByUsername(user.username).then(completedUser => {
          res.status(201).json(completedUser);
        });
      });
    })
    .catch(err => {
      res.status(500).json({
        message: "could not register with provided details",
        error: err
      });
    });
});

router.get("/", checkToken, async (req, res, next) => {
  try {
    const user_id = req.decodedToken.sub;
    const user = await Users.getById(user_id);
    res.status(200).json({
      ...user
    });
  } catch (error) {
    next(error);
  }
});

router.post("/login", Validate.validateLogin, (req, res) => {
  let { username, password } = req.body;

  Users.getByUsername(username)
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = createToken(user);
        res.status(200).json({ token, user_type: user.user_type });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "failed to log in" });
    });
});

module.exports = router;
