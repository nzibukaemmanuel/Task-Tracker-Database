const app = require("./app");
const config = require("./config/config");

require("dotenv").config();

const express = require("express");
const pool = require("./config/db");

// Start server
app.listen(config.port, () => {
  console.log(
    `Server running in ${config.environment} mode on port ${config.port}`
  );
});
