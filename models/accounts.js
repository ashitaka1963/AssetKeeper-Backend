const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema(
  {
    // _id: Number,
    accountName: String,
    accountType: String,
    ownerId: String,
  },
  { timestamps: true }
);

const Account = mongoose.model("accounts", accountSchema);

module.exports = Account;
