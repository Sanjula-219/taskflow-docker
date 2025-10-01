const mongoose = require("mongoose");
const express = require("express");
require("dotenv").config(); // Load .env file

const app = express();

// Middleware
app.use("/", (req, res, next) => {
  res.send("Middleware Executed....");
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log(err));
