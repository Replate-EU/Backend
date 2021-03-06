const router = require("express").Router();

const Users = require("../data/users-model");
const userDetails = require("../data/user-details");

const bcrypt = require("bcryptjs");

const checkToken = require("../middleware/checkToken");

const {
  validateRegister,
  validateUserDetails
} = require("../middleware/validation");

// router.get("/", (req, res) => {
//   Placeholder.get()
//     .then(users => {
//       res.status(200).json(users);
//     })
//     .catch(err => {
//       res.status(500).json({ message: "could not get users" });
//     });
// });

router.get("/", (req, res) => {
  const id = req.decodedToken.sub;
  Users.getById(id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json({ message: "could not get user" });
    });
});

router.put("/", (req, res) => {
  const id = req.decodedToken.sub;
  const user = req.body;
  if (user.password) {
    const hash = bcrypt.hashSync(user.password, 12);
    user.password = hash;
  }
  Users.update(user, id)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json({ message: "could not update user" });
    });
});

router.put("/account/details", validateUserDetails, async (req, res, next) => {
  const user_id = req.decodedToken.sub;
  const { user_type } = req.decodedToken;
  try {
    await userDetails.update(req.body, user_type, user_id);
    res.status(200).json({ message: "Modified" });
  } catch (error) {
    next(error);
  }
});

router.post("/details", checkToken, async (req, res, next) => {
  // validateUserDetails,
  const { user_type } = req.decodedToken;
  const details = req.body;
  details.user_id = req.decodedToken.sub;
  try {
    await userDetails.insert(details, user_type);
    res.status(200).json({ message: "Modified" });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Users.remove(id)
    .then(deleted => {
      res.status(200).json(deleted);
    })
    .catch(err => {
      res.status(500).json({ message: "could not delete user" });
    });
});

router.delete("/remove/details", async (req, res, next) => {
  const { user_type } = req.decodedToken;
  const user_id = req.decodedToken.sub;
  try {
    await userDetails.remove(user_type, user_id);
    res.status(200).json({ message: "Success!" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
