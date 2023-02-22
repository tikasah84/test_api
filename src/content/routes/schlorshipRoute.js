const express = require("express");
const schlorshipValidation = require("../controllers/schlorship/schlorship.validator");
const {
  createSchlorship,
  updateSchlorship,
  deleteSchlorship,
  getSchlorship,
} = require("../controllers/schlorship/schlorship.controller");
const router = express.Router();
router.post("/", schlorshipValidation, createSchlorship);
router.put("/:id", schlorshipValidation, updateSchlorship);
router.get("/", getSchlorship);
router.delete("/:id", deleteSchlorship);

module.exports = router;
