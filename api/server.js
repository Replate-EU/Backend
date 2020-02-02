const express = require("express");
const cors = require('cors');
const helmet = require('helmet');


const apiRouter = require("./api-router");

const configureMiddleware = require("./configure-middleware");

const server = express();

<<<<<<< HEAD
configureMiddleware(server);

=======
server.use(express.json());
server.use(cors());
server.use(helmet());
>>>>>>> 9105a6b66994138aafd655234205fd97ca25820c
server.use("/api", apiRouter);

module.exports = server;
