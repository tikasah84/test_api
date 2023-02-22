const joi = require("joi");
const errorFunction = require("../../../utils/errorFunction");
const Logger = require("../../../../logger");

const validation = joi.object({
  name: joi.string().required(),
  designation: joi.string().required(),
  image: joi.string(),
  content: joi.string(),
});

const testimonialValidation = async (req, res, next) => {
  const payload = {
    name: req.body.name,
    designation: req.body.designation,
    image: req.files.image.name,
    content: req.body.status,
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

module.exports = testimonialValidation;
