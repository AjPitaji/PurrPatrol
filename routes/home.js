const express = require("express");
const router = express.Router();
const Crime = require("../models/crimeModel.js");

// Define a route to display all crimes
router.get("/", async (req, res) => {
  try {
    // Fetch all crimes from the database
    const crimes = await Crime.find();

    // Render a view and pass the crimes data to it
    res.render("home", { crimes });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the data." });
  }
});

module.exports = router;
