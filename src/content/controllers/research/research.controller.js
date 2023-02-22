const errorFunction = require("../../../utils/errorFunction");
const Research = require("../../models/research");
const Logger = require("../../../../logger");

const createResearch = async (req, res) => {
  try {
    const research = new Research(req.body);
    await research.save();
    res.status(200);
    return res.json(errorFunction(false, "Research Created Successfully"));
  } catch (error) {
    Logger.error(`Error in Creating Research : ${error.message}`);
    res.status(406);
    return res.json(
      errorFunction(true, `Error in Creating Research : ${error.message}`)
    );
  }
};

const updateResearch = async (req, res) => {
  try {
    const research = { _id: req.params.id };
    const updateResearch = await Research.findOneAndUpdate(
      research,
      { ...req.body },
      { returnOriginal: false }
    );
    Logger.info(`Research Updated Successfully`);
    res.status(200);
    return res.json(errorFunction(false, "Research Updated Successfully"));
  } catch (error) {
    Logger.error(`Error in Updating Research : ${error.message}`);
    res.status(406);
    return res.json(
      errorFunction(true, `Error in Updating Rersearch : ${error.message}`)
    );
  }
};

const deleteResearch = async (req, res) => {
  try {
    await Research.deleteOne({ _id: req.params.id });
    Logger.info(`Research Deleted Successfully`);
    res.status(200);
    return res.json(errorFunction(false, "Research Deleted Successfully"));
  } catch (error) {
    Logger.error(`Error in Deleting Research : ${error.message}`);
    res.status(406);
    return res.json(
      errorFunction(true, `Error in Deleting Research : ${error.message}`)
    );
  }
};

const getResearch = async (req, res) => {
  try {
    const research = await Research.find({});
    if (research) {
      res.status(200);
      return res.json(errorFunction(false, "Research Data", research));
    } else {
      res.status(200);
      return res.json(errorFunction(false, "No Research Data Found"));
    }
  } catch (error) {
    Logger.error(`Error in Getting Research : ${error.message}`);
    res.status(406);
    return res.json(
      errorFunction(true, `Error in Getting Research : ${error.message}`)
    );
  }
};

module.exports = {
  createResearch,
  updateResearch,
  deleteResearch,
  getResearch,
};
