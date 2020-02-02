const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

module.exports = server => {
  server.use(helmet());
  server.user(express.json());
  server.use(cors());
};
