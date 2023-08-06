const mongoose = require("mongoose");

const balanceSchema = new mongoose.Schema(
  {
    // _id: Number,
    accountId: String,
    balanceDate: Date,
    balanceAmount: Number,
    memo: String,
  },
  { timestamps: true }
);

const Account = mongoose.model("balances", balanceSchema);

module.exports = Account;
