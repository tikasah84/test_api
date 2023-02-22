const errorFunction = require("../../../utils/errorFunction");
const Feedback = require("../../models/feedback");
const Logger = require("../../../../logger");
const { model } = require("mongoose");

const createFeedback = async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.status(200);
    return res.json(errorFunction(false, "Feedback Created Successfully"));
  } catch (error) {
    Logger.error(`Error in Creating Feedback : ${error.message}`);
    res.status(406);
    return res.json(
      errorFunction(true, `Error in Creating Feedback : ${error.message}`)
    );
  }
};

const getFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find({});
    if (feedback) {
      Logger.info(`Feedback Found Successfully`), res.status(200);
      return res.json(
        errorFunction(false, "Feedback Found Successfully", feedback)
      );
    } else {
      Logger.error(`Error in Finding Feedback : ${error.message}`);
      res.status(404);
      return res.json(errorFunction(true, "Feedback Not Found"));
    }
  } catch (error) {
    Logger.error(`Error in Finding Feedback : ${error.message}`);
    res.status(406);
    return res.json(
      errorFunction(true, `Error in Finding Feedback : ${error.message}`)
    );
  }
};

module.exports = {
  createFeedback,
  getFeedback,
};
