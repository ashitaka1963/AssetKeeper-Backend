const express = require("express");
const router = express.Router();
const accountController = require("../controllers/accountsController");

// ユーザー作成のルートハンドラー
router.get("/accounts", accountController.getAccount);
router.get("/accounts/:accountId", accountController.getAccountByAccountId);
router.post("/accounts", accountController.createAccount);
router.patch("/accounts/:accountId", accountController.updateAccount);
router.delete("/accounts/:accountId", accountController.deleteAccount);

router.get(
  "/accounts-with-balances",
  accountController.getAccountsWithBalances
);

module.exports = router;
