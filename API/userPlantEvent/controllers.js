const { UserPlantEvent } = require("../../db/models");

exports.userPlantEventFetch = async (req, res, next) => {
  try {
    const userPlantEvents = await UserPlantEvent.findAll({
      attributes: { excludes: ["createdAt", "updatedAt"] },
    });
    res.json(userPlantEvents);
  } catch (error) {
    next(error);
  }
};

exports.fetchUserPlantEvents = async (userPlantEventId, next) => {
  try {
    const userPlantEvent = await UserPlantEvent.findByPk(userPlantEventId);
    return userPlantEvent;
  } catch (error) {
    next(error);
  }
};

exports.userPlantEventCreate = async (req, res, next) => {
  try {
    if (req.file) req.body.image = `http://${req.get("host")}/${req.file.path}`;
    const newUserPlantEvent = await UserPlantEvent.create(req.body);
    res.status(201).json(newUserPlantEvent);
  } catch (error) {
    next(error);
  }
};

exports.userPlantEventUpdate = async (req, res, next) => {
  try {
    const event = await UserPlantEvent.findByPk(req.body.id);
    await event.update({ status: req.body.status });
    res.json(event);
  } catch (error) {
    next(error);
  }
};
