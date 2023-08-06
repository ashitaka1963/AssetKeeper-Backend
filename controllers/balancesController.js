// TODO:Get：期間絞り込み
// TODO:アカウント一覧を取得時に残高履歴も併せて取得する

const Balance = require("../models/balances");

// 残高一覧取得
exports.getBalance = async (req, res) => {
  try {
    const accounts = await Balance.find();
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ error: "残高の取得に失敗しました。" });
  }
};

// 残高取得（ByBalanceId）
exports.getBalanceByBalanceId = async (req, res) => {
  try {
    const accountId = req.params.accountId;
    const account = await Balance.find({ accountId: accountId });
    res.json(account);
  } catch (error) {
    res.status(500).json({ error: "残高の取得に失敗しました。" });
  }
};

// 残高作成
exports.createBalance = async (req, res) => {
  try {
    const accountId = req.params.accountId;
    const { balanceDate, balanceAmount, memo } = req.body;
    const newBalance = new Balance({
      accountId,
      balanceDate,
      balanceAmount,
      memo,
    });
    await newBalance.save();

    res.json({ message: "残高が登録されました。", balance: newBalance });
  } catch (error) {
    res.status(500).json({ error: "残高の登録に失敗しました。" });
  }
};

// 残高更新
exports.updateBalance = async (req, res) => {
  try {
    const accountId = req.params.accountId;
    const balanceDate = req.params.date;
    const updateFields = req.body;

    // 残高を更新
    const updatedBalance = await Balance.findOneAndUpdate(
      { accountId, balanceDate },
      { $set: updateFields },
      { new: true }
    );

    if (!updatedBalance) {
      return res.status(404).json({ message: "残高が見つかりません。" });
    }

    res.json({
      message: "残高が更新されました。",
      balance: updatedBalance,
    });
  } catch (error) {
    res.status(500).json({ error: "残高の更新に失敗しました。" });
  }
};

// 残高削除
exports.deleteBalance = async (req, res) => {
  try {
    const accountId = req.params.accountId;
    const balanceDate = req.params.date;
    const deletedBalance = await Balance.findOneAndDelete({
      accountId,
      balanceDate,
    });

    if (!deletedBalance) {
      return res.status(404).json({ message: "残高が見つかりません。" });
    }

    res.json({
      message: "残高が削除されました。",
      balance: deletedBalance,
    });
  } catch (error) {
    res.status(500).json({ error: "残高の削除に失敗しました。" });
  }
};
