const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const JWT_KEY = "iamramannagarandiamawebdevelopper";

//Rout:1 Create a user using: POST "/api/auth/createuser". no login require.
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    //if there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      //check whethe the user with this email exist already
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email already exist", success:false });
      }
      //hashing password
      const salt = await bcrypt.genSaltSync(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      //create new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data = {
        user: {
          id: user._id,
        },
      };
      //create jsonwebtoken
      const auhttoken = jwt.sign(data, JWT_KEY);

      res.json({ auhttoken, success:true });
    } catch (error) {
      console.log(error);
      res.status(500).json({ errors: "Internal server error", success:false  });
    }
  }
);

//Rout:2 Authenticate a user using: POST "/api/auth/login". no login require.
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blanck").exists(),
  ],
  async (req, res) => {
    //if there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      //check whethe the user with this email exist already
      let user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials", success:false  });
      }
      //compare password
      const passwordCompare = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials", success:false  });
      }
      const data = {
        user: {
          id: user._id,
        },
      };
      //create jsonwebtoken
      const auhttoken = jwt.sign(data, JWT_KEY);

      res.json({ auhttoken, success:true  });
    } catch (error) {
      console.log(error);
      res.status(500).json({ errors: "Internal server error", success:false });
    }
  }
);

//Rout:3 Get loggedin User details using: POST "/api/auth/getuser". login require.
router.post("/getuser", fetchuser, async (req, res) => {
  try {
      const user = await User.findById(req.user.id).select("-password")
    res.status(200).json(user)
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: "Internal server error" });
  }
});
module.exports = router;
