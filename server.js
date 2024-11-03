const express = require("express");
const path = require("express");
const cors = require("cors");
const corsoptions = require("./middleware/corsOption");
const mongoose = require("mongoose");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const port = process.env.PORT || 3501; // Use environment variable for port

app.use(logger);
require("dotenv").config();

const whitelist = [
  "https://www.yoursite.com",
  "http://127.0.0.1:5500",
  "http://localhost:3500",
];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// ‘content-type: application/x-www-form-urlencoded’
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use(errorHandler);

// Connect to MongoDB and Server
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Database connected successfully");
    // Start the server
    try {
      app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
      });
    } catch (error) {
      console.log("Error connecting to server", error);
    }
  })
  .catch((err) => {
    console.log("Error connecting to database:", err);
  });
