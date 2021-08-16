module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define("Category", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
      },
    },
    icon: {
      type: DataTypes.STRING,
    },
  });

  return Category;
};
