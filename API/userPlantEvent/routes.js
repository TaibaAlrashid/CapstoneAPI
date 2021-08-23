const express = require("express");
const passport = require("passport");
const {
  userPlantEventUpdate,
  userPlantEventFetch,
  fetchUserPlantEvents,
  userPlantEventCreate,
} = require("./controllers");

const router = express.Router();

router.get("/", userPlantEventFetch);

router.param("userPlantEventId", async (req, res, next, userPlantEventId) => {
  const userPlantEvent = await fetchUserPlantEvents(plantId, next);
  if (userPlantEvent) {
    req.userPlantEvent = userPlantEvent;
    next();
  } else {
    const error = new Error("UserPlantEvent Not Found");
    error.status = 404;
    next(error);
  }
});

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  userPlantEventCreate
);

router.put(
  "/update",
  passport.authenticate("jwt", { session: false }),
  userPlantEventUpdate
);

module.exports = router;
