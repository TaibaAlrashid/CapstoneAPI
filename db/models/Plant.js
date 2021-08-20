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
      type: DataTypes.STRING,
    },
    wateringSchedule: {
      type: DataTypes.DATE,
    },
    soilType: {
      type: DataTypes.STRING,
    },
    sunLight: {
      type: DataTypes.INTEGER,
    },
    water: {
      type: DataTypes.INTEGER,
    },
    temperature: {
      type: DataTypes.INTEGER,
    },
  });

  return Plant;
};
