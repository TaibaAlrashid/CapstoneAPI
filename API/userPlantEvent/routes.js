const express = require("express");
const passport = require("passport");
const {} = require("./controllers");

const router = express.Router();

/**
 * This code isn't complete and ready
 * It should be on a branch not merged onto main yet
 */

router.put(passport.authenticate("local", { session: false }));

module.exports = router;
