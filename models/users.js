const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // _id: Number,
    userName: String,
    password: String,
    email: String,
    role: String,
    color: String,
  },
  { timestamps: true }
);

const User = mongoose.model("users", userSchema);

module.exports = User;
