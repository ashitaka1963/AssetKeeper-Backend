const express = require("express");
const router = express.Router();
const balanceController = require("../controllers/balancesController");

// ユーザー作成のルートハンドラー
router.get("/balances", balanceController.getBalance);
router.get("/balances/:accountId", balanceController.getBalanceByAccountId);
router.post("/balances", balanceController.createBalance);
router.patch("/balances/:balanceId", balanceController.updateBalance);
router.delete("/balances/:balanceId", balanceController.deleteBalance);

module.exports = router;
