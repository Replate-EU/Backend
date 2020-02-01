const express = require("express");
const apiRouter = require("./api-router");
const authRouter = require("../routers/auth-router");
const pickupRouter = require("../routers/pickups-router");
const userRouter = require("../routers/users-router");

const server = express();

server.use("/auth", authRouter);
server.use("/pickups", pickupRouter);
server.use("/users", userRouter);

server.use("/api", apiRouter);

module.exports = server;
