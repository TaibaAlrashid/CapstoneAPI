module.exports = (sequelize, DataTypes) => {
  return sequelize.define("UserPlant", {
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
