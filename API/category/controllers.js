const { Category, Plant } = require("../../db/models");

exports.fetchCategory = async (categoryId, next) => {
  try {
    const category = await Category.findByPk(categoryId);
    return category;
  } catch (error) {
    next(error);
  }
};

exports.categoryFetch = async (req, res, next) => {
  try {
    const categories = await Category.findAll({
      attributes: { excludes: ["createdAt", "updatedAt"] },
      include: {
        model: Plant,
        as: "plants",
        attributes: ["id"],
      },
    });
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

exports.categoryCreate = async (req, res, next) => {
  try {
    const foundCategory = await Category.findOne({
      where: { userId: req.user.id },
    });
    if (foundCategory) {
      const err = new Error("Already category created!");
      err.status = 400;
      return next(err);
    }
    if (req.file) req.body.image = `http://${req.get("host")}/${req.file.path}`;
    req.body.userId = req.user.id;
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
};

exports.plantCreate = async (req, res, next) => {
  try {
    if (req.file) req.body.image = `http://${req.get("host")}/${req.file.path}`;
    req.body.categoryId = req.body.id;
    const newPlant = await Plant.create(req.body);
    res.status(201).json(newPlant);
  } catch (error) {
    next(error);
  }
};
