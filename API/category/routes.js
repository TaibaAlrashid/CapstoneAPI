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

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  categoryCreate
);

router.post(
  "/:categoryId/plants",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  plantCreate
);

module.exports = router;
