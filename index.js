// Import required packages
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const authRoute = require("./routes/auth.js");
const addRoute = require("./routes/addcrime.js");
const homeRoute = require("./routes/home.js")
const session = require("express-session");

// Load environment variables from a .env file
dotenv.config();

// Initialize Express
const app = express();

// Set EJS as the view engine
app.set("view engine", "ejs");
app.use(express.static("public"));

// Use BodyParser middleware to parse incoming requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

// Configure express-session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// Define your routes and controllers here

// Middleware to check if the user is logged in
function requireLogin(req, res, next) {
  if (req.session && req.session.userId) {
    // Check for req.session.userId
    next();
  } else {
    res.redirect("/auth");
  }
}

// Use authRoute for authentication routes
app.use("/auth", authRoute);
app.use("/report",requireLogin,addRoute);

// Define a sample protected route
app.use("/", requireLogin, homeRoute);

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
