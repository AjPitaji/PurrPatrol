const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require("../models/userModel.js")

router.get("/",(req,res)=>{
    res.render("auth");
})

router.post("/register",async(req,res)=>{
  const { name, email, password ,pincode} = req.body;
  console.log(req.body);
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User with this email already exists.",
      });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user and save to the database
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      pincode,
    });

    await newUser.save();

    res.redirect("/auth")
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.post("/login",async(req,res)=>{
    const { email, password } = req.body;

    try {
      // Find the user by email
      const user = await User.findOne({ email: email });

      // Check if the user exists and verify the password
      if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password.",
        });
      }

      // Set the user ID in the session
      req.session.userId = user._id;
      req.session.username = user.name;
      req.session.email = user.email;

      res.redirect("/")
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
});
router.get("/signout", (req, res) => {
  // Clear the user's session to log them out
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Unable to sign out.",
      });
    }
    res.redirect("/auth"); // Redirect the user to the login page after sign-out
  });
});
module.exports = router;
