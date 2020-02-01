const router = require("express").Router();

router.get("/", (req, res) => {
  res.json("Server is Running.");
});

module.exports = router;
