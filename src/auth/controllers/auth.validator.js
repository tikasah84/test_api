const joi = require("joi");
const errorFunction = require("../../utils/errorFunction");
const Logger = require("../../../logger");

const validation = joi.object({
  fullName: joi.string().required(),
  dateOfBirthInBS: joi.date().required(),
  dateOfBirthInAD: joi.date().required(),
  phone: joi.string().required(),
  institute: joi.string().required(),
  faculty: joi.string().required(),
  email: joi.string().email().trim(true).required(),
  password: joi.string().min(8).trim(true).required(),
});

const userValidation = async (req, res, next) => {
  const payload = {
    fullName: req.body.fullName,
    dateOfBirthInBS: req.body.dateOfBirthInBS,
    dateOfBirthInAD: req.body.dateOfBirthInAD,
    phone: req.body.phone,
    institute: req.body.institute,
    faculty: req.body.faculty,
    email: req.body.email,
    password: req.body.password,
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

module.exports = userValidation;
