module.exports = (sequelize, DataTypes) => {
  return sequelize.define("UserPlant", {
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    // Event should be added as well
  });
};
