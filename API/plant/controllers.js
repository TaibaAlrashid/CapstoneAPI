const { Plant, UserPlant } = require("../../db/models");

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

exports.userPlantCreate = async (req, res, next) => {
  try {
    if (req.file) req.body.image = `http://${req.get("host")}/${req.file.path}`;
    req.body.userId = req.user.id;
    const newUserPlant = await UserPlant.create(req.body);
    res.status(201).json(newUserPlant);
  } catch (error) {
    next(error);
  }
};
