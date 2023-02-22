const mongoose = require("mongoose");
const { Schema } = mongoose;
const schlorshipSchema = Schema(
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
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Schlorship = mongoose.model("schlorship", schlorshipSchema);

module.exports = Schlorship;
