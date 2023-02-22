const express = require("express");
const researchValidation = require("../controllers/research/research.validator");
const {
  createResearch,
  updateResearch,
  deleteResearch,
  getResearch,
} = require("../controllers/research/research.controller");
const router = express.Router();
router.post("/", researchValidation, createResearch);
router.put("/:id", updateResearch);
router.get("/", getResearch);
router.delete("/:id", deleteResearch);

module.exports = router;
