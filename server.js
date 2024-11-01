const express = require("express");
const mongoose = require("mongoose");

const app = express();
require("dotenv").config();

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.log("Error in Database Connection");
  });

app.listen(3000, () => {
  console.log("Server connected successfully");
});
