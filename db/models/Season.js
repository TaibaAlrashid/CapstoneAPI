module.exports = (sequelize, DataTypes) => {
  const Season = sequelize.define("Season", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
      },
    },
    date: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return Season;
};
