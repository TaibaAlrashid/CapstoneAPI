module.exports = (sequelize, DataTypes) => {
  const UserPlant = sequelize.define("UserPlant", {
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    // Event should be added as well
  });
  return UserPlant;
};
