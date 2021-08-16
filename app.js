const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./API/user/routes");

const app = express();
const db = require("./db/models");

// ****************** MIDDLEWARE  IMPORT ******************
const passport = require("passport");
const { localStrategy } = require("./API/middleware/passport");
const { jwtStrategy } = require("./API/middleware/passport");

// Routes Import

app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

// Routes
app.use(userRoutes);

// Handling Error
app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error." });
});

// Handling Path Not Found
app.use((req, res, next) => {
  res.status(404).json({ message: "Path Not Found." });
});

const run = async () => {
  try {
    await db.sequelize.sync({ alter: true });
    console.log("Connection to the database successful!");
    await app.listen(8000, () => {
      console.log("The application is running on localhost:8000");
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};

run();
