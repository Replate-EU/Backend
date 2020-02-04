const router = require("express").Router();

const Pickups = require("../data/pickups-model");

const Validate = require("../middleware/validation");

router.get("/", (req, res) => {
  //return only pickups with a status of uncompleted
  Pickups.getNotCompleted()
    .then(pickups => {
      res.status(200).json(pickups);
    })
    .catch(err => {
      res.status(500).json({ message: "could not get pickups" });
    });
});

router.get("/:id/details", (req, res) => {
  //returns pickup where({id})
  const id = req.params.id;
  Pickups.getById(id)
    .then(pickup => {
      res.status(200).json(pickup);
    })
    .catch(err => {
      res.status(500).json({ message: "could not get pickup" });
    });
});

router.post("/", Validate.validatePickup, (req, res) => {
  const user_id = req.decodedToken.sub;
  let pickup = req.body;
  pickup.business_id = user_id;
  Pickups.insert(pickup)
    .then(saved => {
      res.status(200).json(saved);
    })
    .catch(err => {
      res.status(500).json({ message: "could not create pickup" });
    });
});

router.get("/me", (req, res) => {
  //returns only pickups created by a specified user
  // claimed pickups for volunteers
  // listed pickups for businesses
  const id = req.decodedToken.sub;
  Pickups.getByUserId(id)
    .then(pickups => {
      res.status(200).json(pickups);
    })
    .catch(err => {
      res.status(500).json({ message: "could not get pickups" });
    });
});

router.put("/:id", Validate.validatePickup, (req, res) => {
  //update pickup info at specified id
  const pickup = req.body;
  const id = req.params.id;
  Pickups.update(pickup, id)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json({ message: "could not update pickup" });
    });
});

router.patch("/:id", async (req, res, next) => {
  //checks id user is listed as claimed_by
  //if so changes completed value to req.body.completed
  const { completed } = req.body;
  const pickup_id = req.params.id;
  try {
    const pickup = await Pickups.getById(req.decodedToken.sub);
    if (pickup.claimed_by === req.decodedToken.sub) {
      await Pickups.update({ completed }, pickup_id);
      res.status(200).json({ message: "Changed!" });
    } else {
      res.status(401).end();
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", (req, res) => {
  //delete pickup at specified id
  const id = req.params.id;
  Pickups.remove(id)
    .then(deleted => {
      res.status(200).json(deleted);
    })
    .catch(err => {
      res.status(500).json({ message: "could not delete pickup" });
    });
});

module.exports = router;
