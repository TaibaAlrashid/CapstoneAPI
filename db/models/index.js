"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// ************** User to plant Relationship **************
db.User.belongsToMany(db.Plant, {
  through: db.UserPlant,
  foreignKey: "userId",
});
db.Plant.belongsToMany(db.User, {
  through: db.UserPlant,
  foreignKey: "plantId",
});

// ************** User to Category Relationship **************
db.User.hasOne(db.Category, {
  as: "category",
  foreignKey: "userId",
});
db.Category.belongsTo(db.User, {
  as: "user",
});

// ************** Plant to Category Relationship **************
db.Category.hasMany(db.Plant, {
  foreignKey: "categoryId",
  allowNull: false,
  as: "plants",
});

db.Plant.belongsTo(db.Category, {
  as: "category",
  foreignKey: "categoryId",
});

// ************** Plant to Season Relationship **************
db.Season.belongsTo(db.Plant, {
  as: "plant",
});
db.Plant.hasOne(db.Season, {
  foreignKey: "plantId",
});

// ************** Plant to Event Relatioship **************
db.Plant.belongsTo(db.Event, {
  as: "event",
});
db.Event.hasOne(db.Plant, {
  foreignKey: "eventId",
});

/* Relationship (M-M) between events and userplant extend to a new model userplantevent */
db.Event.belongsToMany(db.UserPlant, {
  through: db.UserPlantEvent,
  foreignKey: "status",
});
db.UserPlant.belongsToMany(db.Event, {
  through: db.UserPlantEvent,
  foreignKey: "status",
});

module.exports = db;
