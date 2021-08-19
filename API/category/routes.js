const express = require("express");
const multer = require("multer");
const passport = require("passport");

const {
  categoryFetch,
  categoryCreate,
  plantCreate,
  fetchCategory,
} = require("./controllers");
const router = express.Router();

const storage = multer.diskStorage({
  destination: "./media",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});
const upload = multer({ storage });

//You need this for? you don't need it remove it
router.param("categoryId", async (req, res, next, categoryId) => {
  const category = await fetchCategory(categoryId, next);
  if (category) {
    req.category = category;
    next();
  } else {
    const error = new Error("Category Not Found!");
    error.status = 404;
    next(error);
  }
});

router.get("/", categoryFetch);

// who will create the category? not the user remove this route!
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  categoryCreate
);
// Can the user add a plants to category? no so remove this!
router.post(
  "/:categoryId/plants",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  plantCreate
);

module.exports = router;
