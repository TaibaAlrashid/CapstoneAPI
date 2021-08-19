const express = require("express");
const router = express.Router();
//again imports before the router
const { plantsFetch, fetchPlants, plantCreate } = require("./controllers");

// passport for what?
const passport = require("passport");

// multer for?
// the user will not upload an image why would you need it here?
const multer = require("multer");

router.get("/", plantsFetch);

const storage = multer.diskStorage({
  destination: "./media",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});
const upload = multer({ storage });

//what do you need it for? I don't think you need it
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
// remove this 👇🏻
// router.post(
//   "/",
//   passport.authenticate("jwt", { session: false }),
//   upload.single("image"),
//   plantCreate
// );

module.exports = router;
