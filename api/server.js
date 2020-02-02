const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const apiRouter = require("./api-router");

const configureMiddleware = require("./configure-middleware");

const server = express();

configureMiddleware(server);

server.use("/api", apiRouter);

module.exports = server;
