const express = require("express");
const router = express.Router();

const { plantsFetch, fetchPlants, userPlantCreate } = require("./controllers");

const multer = require("multer");

// the list of plants should be part of the category list route
// one route to bring them all.
router.get("/", plantsFetch);

const storage = multer.diskStorage({
  destination: "./media",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});
const upload = multer({ storage });

// do you need this?
// clearly not. there's no route with plantId anywhere. remove it. don't just add code for no reason.
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

router.post("/add", userPlantCreate);

module.exports = router;
