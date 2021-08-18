const express = require("express");
const router = express.Router();

const { plantsFetch, fetchPlants, plantCreate } = require("./controllers");

const passport = require("passport");

const multer = require("multer");

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
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  plantCreate
);

module.exports = router;
