const express = require("express");
const passport = require("passport");
const {} = require("./controllers");

const router = express.Router();

router.put(passport.authenticate("local", { session: false }));

module.exports = router;
