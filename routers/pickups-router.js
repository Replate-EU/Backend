const router = require("express").Router();

const Placeholder = {
  find,
  findById,
  findNotCompleted,
  findMy,
  updateById,
  remove
};

//returns all pickups
router.get("/", (req, res) => {
  Placeholder.find()
    .then(pickups => {
      res.status(200).json(pickups);
    })
    .catch(err => {
      res.status(500).json({ message: "could not get pickups" });
    });
});

//returns pickup where({id})
router.get("/:id", (req, res) => {
  const id = req.params.id;
  Placeholder.findById(id)
    .then(pickup => {
      res.status(200).json(pickup);
    })
    .catch(err => {
      res.status(500).json({ message: "could not get pickup" });
    });
});

//return only pickups with a status of uncompleted
router.get("/available", (req, res) => {
  Placeholder.findNotCompleted()
    .then(pickups => {
      res.status(200).json(pickups);
    })
    .catch(err => {
      res.status(500).json({ message: "could not get pickups" });
    });
});

//returns only pickups created by a specified user
router.get("/me", (req, res) => {
  const id = req.decodedToken.sub;
  Placeholder.findMy(id)
    .then(pickups => {
      res.status(200).json(pickups);
    })
    .catch(err => {
      res.status(500).json({ message: "could not get pickups" });
    });
});

//update pickup info at specified id
router.put("/:id", (req, res) => {
  const id = req.params.id;
  Placeholder.updateById(id)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json({ message: "could not update pickup" });
    });
});

//delete pickup at specified id
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Placeholder.remove(id)
    .then(deleted => {
      res.status(200).json(deleted);
    })
    .catch(err => {
      res.status(500).json({ message: "could not delete pickup" });
    });
});
