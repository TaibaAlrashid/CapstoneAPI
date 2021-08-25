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
    done: {
      type: DataTypes.BOOLEAN,
    },
  });

  return Event;
};
