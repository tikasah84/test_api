const express = require("express");
const userValidation = require("../controllers/auth.validator");
const {
  addUser,
  login,
  profile,
  auth,
  deleteUser,
} = require("../controllers/auth.controller");

const router = express.Router();
router.post("/register", userValidation, addUser);
router.post("/login", login);
router.get("/profile", auth, profile);
router.delete("/delete/:id", deleteUser);

module.exports = router;
