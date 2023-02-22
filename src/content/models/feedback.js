const mongoose = require("mongoose");
const { Schema } = mongoose;
const feedbackSchema = Schema(
  {
    feedback: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Feedback = mongoose.model("feedback", feedbackSchema);

module.exports = Feedback;
