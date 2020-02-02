const express = require("express");
const cors = require('cors');
const helmet = require('helmet');


const apiRouter = require("./api-router");

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use("/api", apiRouter);

module.exports = server;
