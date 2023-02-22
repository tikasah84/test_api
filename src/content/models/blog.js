const mongoose = require("mongoose");
const { Schema } = mongoose;
const blogSchema = Schema(
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

const Blog = mongoose.model("blog", blogSchema);

module.exports = Blog;
