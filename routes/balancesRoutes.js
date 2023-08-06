const express = require("express");
const router = express.Router();
const balanceController = require("../controllers/balancesController");

// ユーザー作成のルートハンドラー
router.get("/balances", balanceController.getBalance);
router.get("/balances/:accountId", balanceController.getBalanceByBalanceId);
router.post("/balances/:accountId", balanceController.createBalance);
router.patch("/balances/:accountId/:date", balanceController.updateBalance);
router.delete("/balances/:accountId/:date", balanceController.deleteBalance);

module.exports = router;
