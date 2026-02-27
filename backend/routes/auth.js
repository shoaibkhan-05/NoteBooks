const express = require("express");
const router = express.Router();
const user = require("../models/user");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const fetchUser = require("../middelware/fetchuser");

const JWT_SECRET = "shoaibkhan";


//signup
router.post(
  "/signup",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "passworrd must be atleast 8 caharacter").isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    let success = false;
    //if there are errors , returns request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    try {
      let users = await user.findOne({ email: req.body.email });
      if (users) {
        return res
          .status(400)
          .json({
            success,
            error: "sorry a user with this email alresy exist",
          });
      }
      const salt = await bcrypt.genSaltSync(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      //create new user
      const newUser = await user.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user: {
          id: newUser.id,
          role:newUser.role
        },
      };

      var jwtToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, jwtToken });
    } catch (error) {
      console.log(error.message);
      res.status(500).json(" internals server erorr");
    }
  }
);

//login user
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "password cannot be balank").exists(),
  ],
  async (req, res) => {
    let success = false;
    //if there are errors , returns request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let checkUser = await user.findOne({ email });
      //check user exists
      if (!checkUser) {
        success = false;
        return res
          .status(400)
          .json({
            success,
            error: "please try to login with correct credential",
          });
      }
      const match = await bcrypt.compare(password, checkUser.password);

      // if user entered wrong credentials
      if (!match) {
        success = false;
        return res
          .status(400)
          .json({
            success,
            error: "please try to login with correct credential",
          });
      }

      const data = {
        user: {
          id: checkUser.id,
          role:checkUser.role
        },
      };

      var jwtToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, jwtToken });
    } catch (error) {
      console.log(error);
      res.status(500).send(" internals server erorr");
    }
  }
);

//get loggedin user data
router.post(
  "/getuser",
  fetchUser,

  async (req, res) => {
    try {
      let userId = req.user.id;
      const User = await user.findById(userId).select("-password");
      res.send(User);
    } catch (error) {
      console.error(error.message);
      return res.status(500).send(" internals server erorr");
    }
  }
);
module.exports = router;
