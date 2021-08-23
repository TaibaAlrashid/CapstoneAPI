const express = require("express");
const router = express.Router();

const { plantsFetch, fetchPlants, userPlantCreate } = require("./controllers");

const passport = require("passport");

const multer = require("multer");
const { session } = require("passport");

router.get("/", plantsFetch);

const storage = multer.diskStorage({
  destination: "./media",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});
const upload = multer({ storage });

router.param("plantId", async (req, res, next, plantId) => {
  const plant = await fetchPlants(plantId, next);
  if (plant) {
    req.plant = plant;
    next();
  } else {
    const error = new Error("Plant Not Found");
    error.status = 404;
    next(error);
  }
});

router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  userPlantCreate
);

module.exports = router;
