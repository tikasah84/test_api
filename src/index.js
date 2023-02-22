require("dotenv").config();
require("./db/connection");
const express = require("express");
const fileUpload = require("express-fileupload");
var cors = require("cors");
const authRoutes = require("./auth/routes/authRoute");
const schlorshipRoute = require("./content/routes/schlorshipRoute");
const researchRoute = require("./content/routes/researchRoute");
const feedbackRoute = require("./content/routes/feedbackRoute");
const testimonialRoute = require("./content/routes/testimonialRoute");
const bodyParser = require("body-parser");
const rateLimit = require("express-rate-limit");

const app = express();
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 100, // limit each IP to 10 requests per windowMs
  message: "Too many requests, please try again later",
});
app.use(cors());
const port = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";

app.use(bodyParser.json());
// app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: "10MB" }));

app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    useTempFiles: true,
    createParentPath: true,
    tempFileDir: "../uploads/",
  })
);

app.use("/", limiter, authRoutes);
app.use("/schlorship", limiter, schlorshipRoute);
app.use("/research", limiter, researchRoute);
app.use("/feedback", limiter, feedbackRoute);
app.use("/testimonial", limiter, testimonialRoute);

app.listen(port, HOST, () => {
  console.log(`Server is running on http://${HOST}:${port}`);
});
