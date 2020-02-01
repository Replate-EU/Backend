const router = require("express").Router();

const Pickups = require("../data/pickups-model");

//return only pickups with a status of uncompleted
router.get("/", (req, res) => {
  Pickups.getNotCompleted()
    .then(pickups => {
      res.status(200).json(pickups);
    })
    .catch(err => {
      res.status(500).json({ message: "could not get pickups" });
    });
});

//returns pickup where({id})
/* router.get("/:id", (req, res) => {
  const id = req.params.id;
  Pickups.getById(id)
    .then(pickup => {
      res.status(200).json(pickup);
    })
    .catch(err => {
      res.status(500).json({ message: "could not get pickup" });
    });
}); */

router.post("/", (req, res) => {
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

// router.get("/available", (req, res) => {
//   Placeholder.findNotCompleted()
//     .then(pickups => {
//       res.status(200).json(pickups);
//     })
//     .catch(err => {
//       res.status(500).json({ message: "could not get pickups" });
//     });
// });

//returns only pickups created by a specified user
router.get("/me", (req, res) => {
  const id = req.decodedToken.sub;
  Pickups.getByUserId(id)
    .then(pickups => {
      res.status(200).json(pickups);
    })
    .catch(err => {
      res.status(500).json(/* { message: "could not get pickups" } */err);
    });
});

//update pickup info at specified id
router.put("/:id", (req, res) => {
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

//delete pickup at specified id
router.delete("/:id", (req, res) => {
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
