const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
  pincode: String,
});
module.exports = mongoose.model("User", UserSchema);
