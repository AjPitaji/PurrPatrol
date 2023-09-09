const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const CrimeSchema = new Schema({
  culprit: String,
  location: String,
  pincode: String,
  scale: String,
  image: String,
  type:String,
  description:String,
});

module.exports = mongoose.model("Crime", CrimeSchema);
