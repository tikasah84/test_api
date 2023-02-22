const express = require("express");
const testimonialValidation = require("../controllers/testimonial/testimonial.validator");
const {
  createTestimonial,
  getTestimonial,
} = require("../controllers/testimonial/testimonial.controller");
const router = express.Router();
router.post("/", testimonialValidation, createTestimonial);
router.get("/", getTestimonial);

module.exports = router;
