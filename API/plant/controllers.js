const { Plant } = require("../../db/models");

exports.plantsFetch = async (req, res, next) => {
  try {
    const plants = await Plant.findAll({
      attributes: { excludes: ["createdAt", "updatedAt"] },
    });
    res.json(plants);
  } catch (error) {
    next(error);
  }
};

exports.fetchPlants = async (req, res, next) => {
  try {
    const plant = await Plant.findByPk(plantId);
    return plant;
  } catch (error) {
    next(error);
  }
};

exports.plantCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/${req.file.path}`;
    }
    req.body.plantId = req.user.id;
    const newPlant = await Plant.create(req.body);
    res.status(201).json(newPlant);
  } catch (error) {
    next(error);
  }
};
