const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  location: String,
  description: String,
  occupation: String,
  login_name: String,
  password: String,
});

module.exports = mongoose.model("User", UserSchema);
