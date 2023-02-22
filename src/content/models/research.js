const mongoose = require("mongoose");
const { Schema } = mongoose;
const researchSchema = Schema(
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

const Research = mongoose.model("research", researchSchema);

module.exports = Research;
