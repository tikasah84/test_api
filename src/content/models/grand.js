const mongoose = require("mongoose");
const { Schema } = mongoose;
const grandSchema = Schema(
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
    content: {
      type: [
        {
          topic: String,
          description: String,
        },
      ],
      required: false,
    },
  },
  { timestamps: true }
);

const Grand = mongoose.model("grand", grandSchema);

module.exports = Grand;
