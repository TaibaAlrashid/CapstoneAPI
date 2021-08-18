module.exports = (sequelize, DataTypes) => {
  return sequelize.define("PlantUser", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    plantId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  });
};
