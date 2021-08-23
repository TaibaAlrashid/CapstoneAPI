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
// if things have been working so far, delete this code.
// db.User.belongsToMany(db.Plant, {
//   through: db.UserPlant,
//   foreignKey: "userId",
// });
// db.Plant.belongsToMany(db.User, {
//   through: db.UserPlant,
//   foreignKey: "plantId",
// });

// ************** User ----< UserPlant **************
db.User.hasMany(db.UserPlant, {
  foreignKey: "userId",
  allowNull: false,
  as: "userPlants",
});
db.UserPlant.belongsTo(db.User, {
  foreignKey: "userId",
  as: "user",
});

// ************** Plant ----< UserPlant **************
db.Plant.hasMany(db.UserPlant, {
  foreignKey: "plantId",
  allowNull: false,
  as: "userPlants",
});
db.UserPlant.belongsTo(db.Plant, {
  foreignKey: "plantId",
  as: "plant",
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
db.Season.belongsTo(db.Plant, {});
db.Plant.hasOne(db.Season, {});

// ************** Plant to Event Relatioship **************
db.Plant.belongsTo(db.Event, {
  as: "event",
});
db.Event.hasOne(db.Plant, {
  as: "plant",
  foreignKey: "eventId",
});

// remove commented code
/* Relationship (M-M) between events and userplant extend to a new model userplantevent */
// db.Event.belongsToMany(db.UserPlant, {
//   through: db.UserPlantEvent,
//   foreignKey: "status",
// });
// db.UserPlant.belongsToMany(db.Event, {
//   through: db.UserPlantEvent,
//   foreignKey: "status",
// });

// ************** Event ----< UserPlantEvent **************
db.Event.hasMany(db.UserPlantEvent, {
  foreignKey: "eventId",
  allowNull: false,
  as: "userPlantEvents",
});
db.UserPlantEvent.belongsTo(db.Event, {
  foreignKey: "eventId",
  as: "event",
});

// ************** UserPlant ----< UserPlantEvent **************
db.UserPlant.hasMany(db.UserPlantEvent, {
  foreignKey: "userPlantId",
  allowNull: false,
  as: "userPlantEvents",
});
db.UserPlantEvent.belongsTo(db.UserPlant, {
  foreignKey: "userPlantId",
  as: "userPlant",
});

module.exports = db;
