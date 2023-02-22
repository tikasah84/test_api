const mongoose = require("mongoose");
const { Schema } = mongoose;
const testimonialSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: false,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Testimonial = mongoose.model("testimonial", testimonialSchema);

module.exports = Testimonial;
