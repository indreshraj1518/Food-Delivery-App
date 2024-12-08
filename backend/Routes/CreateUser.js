const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

const bycrpt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = "bfbfdjklNDHAgyfdsaef6@T736";
router.post(
  "/createuser",
  [
    body("email").isEmail(),
    body("name", "name is not valid").isLength({ min: 5 }),
    body("password", "Incorrect password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const salt = await bycrpt.genSalt(10);
    let setPassword = await bycrpt.hash(req.body.password, salt);
    try {
      // Create user in the database
      const newUser = await User.create({
        name: req.body.name,
        password: setPassword,
        email: req.body.email,
        location: req.body.location,
      });

      // Respond with success
      return res.json({ success: true, user: newUser });
    } catch (error) {
      console.error(error);
      // Respond with error
      return res.status(500).json({ success: false, message: error.message });
    }
  }
);
router.post(
  "/loginuser",
  [
    body("email").isEmail(),

    body("password", "Incorrect password").isLength({ min: 5 }),
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let email = req.body.email;
    try {
      // Create user in the database
      const userData = await User.findOne({ email });
      if (!userData) {
        return res
          .status(400)
          .json({ errors: "try to login with correct Credentials" });
      }
      const pwdCompare = await bycrpt.compare(
        req.body.password,
        userData.password
      );
      if (!pwdCompare) {
        return res
          .status(400)
          .json({ errors: "try to login with correct Credentials" });
      }
      const data = {
        user: {
          id: userData.id,
        },
      };
      const authtoken = jwt.sign(data, jwtSecret);

      return res.json({ sucess: true, authtoken: authtoken });

      // Respond with success
      return res.json({ success: true, user: newUser });
    } catch (error) {
      console.error(error);
      // Respond with error
      return res.status(500).json({ success: false, message: error.message });
    }
  }
);

module.exports = router;
