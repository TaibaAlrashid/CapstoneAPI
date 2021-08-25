const { Event } = require("../../db/models");

exports.eventsFetch = async (req, res, next) => {
  try {
    const events = await Event.findAll({
      attributes: { excludes: ["createdAt", "updatedAt"] },
    });
    res.json(events);
  } catch (error) {
    next(error);
  }
};

exports.fetchEvents = async (eventId, next) => {
  try {
    const event = await Event.findByPk(eventId);
    return event;
  } catch (error) {
    next(error);
  }
};

exports.createEvent = async (req, res, next) => {
  try {
    if (req.file) req.body.image = `http://${req.get("host")}/${req.file.path}`;
    const newEvent = await Event.create(req.body);
    res.status(201).json(newEvent);
  } catch (error) {
    next(error);
  }
};
exports.updateEvents = async (req, res, next) => {
  try {
    const updatedEvent = await req.event.update(req.body);
    res.json(updatedEvent);
  } catch (error) {
    next(error);
  }
};
