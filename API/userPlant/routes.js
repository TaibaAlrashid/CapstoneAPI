const express = require("express");
const { plantit } = require("./controllers");
const passport = require("passport");

const router = express.Router();

router.post(
  "/plantit",
  passport.authenticate("jwt", { session: false }),
  plantit
);

module.exports = router;
