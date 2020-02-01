const router = require("express").Router();

const authRouter = require("../routers/auth-router");
const pickupRouter = require("../routers/pickups-router");
const userRouter = require("../routers/users-router");

const checkToken = require("../middleware/checkToken");

router.use("/auth", authRouter);
router.use("/pickups", checkToken, pickupRouter);
router.use("/users", checkToken, userRouter);

router.get("/", (req, res) => {
  res.json("Server is Running.");
});

module.exports = router;
