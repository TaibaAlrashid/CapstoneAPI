const { UserPlant } = require("../../db/models");

exports.plantit = async (req, res, next) => {
  try {
    req.body.userId = req.user.id;
    const newUserPlant = await UserPlant.create(req.body);
    // console.log("THE REQ BODY IS IN HERE ------> ");
    // console.log(req.body);
    res.status(201).json(newUserPlant);
  } catch (error) {
    next(error);
  }
};
