const express = require("express");

const apiRouter = require("./api-router");

const server = express();

server.use("/api", apiRouter);

module.exports = server;
