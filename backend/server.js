const express = require("express");
const cors = require("cors");
const corsOptions = require("./middleware/cors");
const mongoose = require("mongoose");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
require("dotenv").config();
const app = express();
const port = process.env.PORT;
const adminRoutes = require("./routes/adminRoutes");

app.use(logger);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(errorHandler);
app.use("/", adminRoutes);

// Connect to MongoDB and Server
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Database connected");
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
