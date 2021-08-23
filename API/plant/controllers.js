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
