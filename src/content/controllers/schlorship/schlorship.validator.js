const joi = require("joi");
const errorFunction = require("../../../utils/errorFunction");
const Logger = require("../../../../logger");

const validation = joi.object({
  title: joi.string().required(),
  description: joi.string().required(),
  link: joi.string(),
  status: joi.string(),
});

const schlorshipValidation = async (req, res, next) => {
  const payload = {
    title: req.body.title,
    description: req.body.description,
    link: req.body.link,
    status: req.body.status,
  };

  const { error } = validation.validate(payload);
  if (error) {
    Logger.error(`Error in User Data : ${error.message}`);
    res.status(406);
    return res.json(
      errorFunction(true, `Error in User Data : ${error.message}`)
    );
  } else {
    next();
  }
};

module.exports = schlorshipValidation;
