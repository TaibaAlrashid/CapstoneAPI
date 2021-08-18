const SequelizeSlugify = require("sequelize-slugify");
module.exports = (sequelize, DataTypes) => {
  const Plant = sequelize.define("Plant", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
    },
    season: {
      type: DataTypes.STRING,
    },
    growthPeriod: {
      type: DataTypes.INTEGER,
    },
    wateringSchedule: {
      type: DataTypes.DATE,
    },
    soilType: {
      type: DataTypes.STRING,
    },
  });

  SequelizeSlugify.slugifyModel(Plant, { source: ["name"] });
  return Plant;
};
