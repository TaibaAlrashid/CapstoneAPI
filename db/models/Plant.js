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

    //Growth period, watering schedule, soil type, season
  });

  SequelizeSlugify.slugifyModel(Plant, { source: ["name"] });
  return Plant;
};
