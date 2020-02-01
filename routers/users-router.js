const router = require("express").Router();

const Placeholder = { get, getById, updateById, remove };

router.get("/", (req, res) => {
  Placeholder.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ message: "could not get users" });
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  Placeholder.getById(id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json({ message: "could not get user" });
    });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  Placeholder.updateById(id)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json({ message: "could not update user" });
    });
});

router.delete("/:id", (res, res) => {
  Placeholder.remove(id)
    .then(deleted => {
      res.status(200).json(deleted);
    })
    .catch(err => {
      res.status(500).json({ message: "could not delete user" });
    });
});

module.exports = router;
