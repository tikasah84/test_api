const mongoose = require("mongoose");
const mongo_uri = process.env.MONGO_URI;
mongoose.set("strictQuery", false);
mongoose
  .connect(mongo_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection successfull!");
  })
  .catch((e) => {
    console.log("Connection failed!", e);
  });
