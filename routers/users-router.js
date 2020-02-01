const router = require("express").Router();

const Users = require("../data/users-model");

// router.get("/", (req, res) => {
//   Placeholder.get()
//     .then(users => {
//       res.status(200).json(users);
//     })
//     .catch(err => {
//       res.status(500).json({ message: "could not get users" });
//     });
// });

router.get("/:id", (req, res) => {
  const id = req.params.id;
  Users.getById(id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json({ message: "could not get user" });
    });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  Users.update(id)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json({ message: "could not update user" });
    });
});

router.delete("/:id", (re9, res) => {
  Users.remove(id)
    .then(deleted => {
      res.status(200).json(deleted);
    })
    .catch(err => {
      res.status(500).json({ message: "could not delete user" });
    });
});

module.exports = router;
