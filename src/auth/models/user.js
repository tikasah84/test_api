const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    dateOfBirthInBS: {
      type: Date,
      required: true,
    },
    dateOfBirthInAD: {
      type: Date,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    institute: {
      type: String,
      required: true,
    },
    faculty: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
