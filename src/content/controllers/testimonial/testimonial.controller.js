const errorFunction = require("../../../utils/errorFunction");
const Testimonial = require("../../models/testimonial");
const Logger = require("../../../../logger");
const { model } = require("mongoose");

const createTestimonial = async (req, res) => {
  try {
    const testimonial = new Testimonial({
      name: req.body.name,
      designation: req.body.designation,
      image: req.files.image.name,
      content: req.body.content,
    });
    await testimonial.save();
    res.status(200);
    return res.json(errorFunction(false, "Testimonial Created Successfully"));
  } catch (error) {
    Logger.error(`Error in Creating Testimonial : ${error.message}`);
    res.status(406);
    return res.json(
      errorFunction(true, `Error in Creating Testimonial : ${error.message}`)
    );
  }
};

const getTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.find({});
    if (testimonial) {
      Logger.info(`Testimonial Found Successfully`), res.status(200);
      return res.json(
        errorFunction(false, "Testimonial Found Successfully", testimonial)
      );
    } else {
      Logger.error(`Error in Finding Testimonial : ${error.message}`);
      res.status(404);
      return res.json(errorFunction(true, "Testimonial Not Found"));
    }
  } catch (error) {
    Logger.error(`Error in Finding Testimonial : ${error.message}`);
    res.status(406);
    return res.json(
      errorFunction(true, `Error in Finding Testimonial : ${error.message}`)
    );
  }
};

module.exports = {
  createTestimonial,
  getTestimonial,
};
