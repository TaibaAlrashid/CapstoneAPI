module.exports = (sequelize, DataTypes) => {
  return sequelize.define("UserPlantEvent", {
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  });
};
