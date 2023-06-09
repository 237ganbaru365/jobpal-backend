const express = require("express");
const { check } = require("express-validator");

const userControllers = require("../controllers/user-controllers");

const router = express.Router();

router.get("/", userControllers.getAllUsers);

router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  userControllers.signup
);

router.post("/login", userControllers.login);

module.exports = router;
