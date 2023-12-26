const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lower: true },
  password: { type: String, required: true },
  role: {type: String, required: true},
  name: {type: String, required: true},
  phoneNo: {type: String, required: true}
});

const User = mongoose.model("User", userSchema);

module.exports = User;
