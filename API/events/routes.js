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

router.get("/", eventsFetch);

const storage = multer.diskStorage({
  destination: "./media",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});
const upload = multer({ storage });

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

router.post("/add", createEvent);
router.put("/:eventId", updateEvents);
module.exports = router;
