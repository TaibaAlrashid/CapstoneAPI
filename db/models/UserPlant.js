module.exports = (sequelize, DataTypes) => {
  return sequelize.define("UserPlant", {
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    // Event should be added as well
    // no not here, relationship is handled in index.js
  });
};
