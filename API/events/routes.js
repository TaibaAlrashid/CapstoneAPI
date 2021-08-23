const express = require("express");
const router = express.Router();

const {
  eventsFetch,
  fetchEvents,
  updateEvents,
  createEvent,
} = require("./controllers");

const passport = require("passport");

const multer = require("multer");

/**
 * passport and multer aren't being used here
 */

// does the user see a list of events?
router.get("/", eventsFetch);

const storage = multer.diskStorage({
  destination: "./media",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});
const upload = multer({ storage });

// is this needed? there's no route with event id in it
router.param("eventId", async (req, res, next, eventId) => {
  const event = await fetchEvents(eventId, next);
  if (event) {
    req.event = event;
    next();
  } else {
    const error = new Error("Event Not Found!");
    error.status = 404;
    next(error);
  }
});

// user doesn't create events, but ill leave this since you said you have this for you only not for the user
router.post("/add", createEvent);

module.exports = router;
