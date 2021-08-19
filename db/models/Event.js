module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define("Event", {
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    day: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    time: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // status: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
  });

  return Event;
};
