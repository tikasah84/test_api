const mongoose = require("mongoose");
const { Schema } = mongoose;
const internshipSchema = Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    link: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const Internship = mongoose.model("internship", internshipSchema);

module.exports = Internship;
