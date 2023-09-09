const express = require("express");
const router = express.Router();
const Crime = require("../models/crimeModel.js");
const User = require("../models/userModel.js");
const nodemailer = require("nodemailer");

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.email,
        pass: process.env.pass,
      },
      debug: true, // Enable debugging
    });

router.get("/", async (req, res) => {
  res.render("addcrime");
});

router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    // Create a new Crime object using the data from the request
    const newCrime = new Crime({
      culprit: req.body.culprit,
      location: req.body.location,
      pincode: req.body.pincode,
      scale: req.body.scale,
      type: req.body.type,
      image: req.body.image,
      description: req.body.description,
    });

    // Save the new Crime object to the database
    await newCrime.save();

    // Send a success response
    res.redirect("/");

    // Find users with the same pincode as the crime
    const users = await User.find({ pincode: req.body.pincode });

    // Send emails to users in the same pincode
    for (const user of users) {
      const mailOptions = {
        from: process.env.email, // Your email address
        to: user.email,
        subject: "Crime Alert",
        text: `A crime has been reported in your area (Pincode: ${req.body.pincode}).`,
      };

      // Send the email
      await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
        } else {
          console.log("Email sent:", info.response);
        }
      });
    }
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing your request." });
  }
});

module.exports = router;
