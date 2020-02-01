const express = require("express");

const apiRouter = require("./api-router");
const authRouter = require("../routers/auth-router");
const pickupRouter = require("../routers/pickups-router");
const userRouter = require("../routers/users-router");

const checkToken = require("../middleware/checkToken");

const server = express();

server.use("/auth", authRouter);
server.use("/pickups", checkToken, pickupRouter);
server.use("/users", checkToken, userRouter);

server.use("/api", apiRouter);

module.exports = server;
