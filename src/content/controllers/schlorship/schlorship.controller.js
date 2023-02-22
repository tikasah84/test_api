const errorFunction = require("../../../utils/errorFunction");
const Schlorship = require("../../models/schlorship");
const Logger = require("../../../../logger");
const { model } = require("mongoose");

const createSchlorship = async (req, res) => {
  try {
    const schlorship = new Schlorship(req.body);
    await schlorship.save();
    res.status(200);
    return res.json(errorFunction(false, "Schlorship Created Successfully"));
  } catch (error) {
    Logger.error(`Error in Creating Schlorship : ${error.message}`);
    res.status(406);
    return res.json(
      errorFunction(true, `Error in Creating Schlorship : ${error.message}`)
    );
  }
};

const updateSchlorship = async (req, res) => {
  //update schlorship
  try {
    const schlorship = { _id: req.params.id };
    const updatedSchlorship = await Schlorship.findOneAndUpdate(
      schlorship,
      { ...req.body },
      { returnOriginal: false }
    );
    Logger.info(`Schlorship Updated Successfully`);
    res.status(200);
    return res.json(errorFunction(false, "Schlorship Updated Successfully"));
  } catch (error) {
    Logger.error(`Error in Updating Schlorship : ${error.message}`);
    res.status(406);
    return res.json(
      errorFunction(true, `Error in Updating Schlorship : ${error.message}`)
    );
  }
};

const deleteSchlorship = async (req, res) => {
  try {
    await Schlorship.deleteOne({ _id: req.params.id });
    Logger.info(`Schlorship Deleted Successfully`);
    res.status(200);
    return res.json(errorFunction(false, "Schlorship Deleted Successfully"));
  } catch (error) {
    Logger.error(`Error in Deleting Schlorship : ${error.message}`);
    res.status(406);
    return res.json(
      errorFunction(true, `Error in Deleting Schlorship : ${error.message}`)
    );
  }
};

const getSchlorship = async (req, res) => {
  try {
    const schlorship = await Schlorship.find({});
    if (schlorship) {
      Logger.info(`Schlorship Found Successfully`), res.status(200);
      return res.json(
        errorFunction(false, "Schlorship Found Successfully", schlorship)
      );
    } else {
      Logger.error(`Error in Finding Schlorship : ${error.message}`);
      res.status(404);
      return res.json(errorFunction(true, "Schlorship Not Found"));
    }
  } catch (error) {
    Logger.error(`Error in Finding Schlorship : ${error.message}`);
    res.status(406);
    return res.json(
      errorFunction(true, `Error in Finding Schlorship : ${error.message}`)
    );
  }
};

module.exports = {
  createSchlorship,
  updateSchlorship,
  deleteSchlorship,
  getSchlorship,
};
