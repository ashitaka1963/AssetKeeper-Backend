const Balance = require("../models/balances");

// 残高一覧取得
exports.getBalance = async (req, res) => {
  try {
    const query = {};
    const startDate = req.query.startDate; // 開始日
    const endDate = req.query.endDate; // 終了日

    // 開始日が指定されている場合、条件を追加
    if (startDate) {
      query.balanceDate = {
        $gte: startDate,
      };
    }

    // 終了日が指定されている場合、条件を追加
    if (endDate) {
      query.balanceDate = query.balanceDate || {}; // 既に条件がある場合、その条件を保持
      query.balanceDate.$lte = endDate;
    }

    const balances = await Balance.find(query);
    res.json(balances);
  } catch (error) {
    res.status(500).json({ error: "残高の取得に失敗しました。" });
  }
};

// 残高一覧取得（ByAccountId）
exports.getBalanceByAccountId = async (req, res) => {
  try {
    const query = {};
    const accountId = req.params.accountId;
    query.accountId = accountId;

    const startDate = req.query.startDate; // 開始日
    const endDate = req.query.endDate; // 終了日

    // 開始日が指定されている場合、条件を追加
    if (startDate) {
      query.balanceDate = {
        $gte: startDate,
      };
    }

    // 終了日が指定されている場合、条件を追加
    if (endDate) {
      query.balanceDate = query.balanceDate || {}; // 既に条件がある場合、その条件を保持
      query.balanceDate.$lte = endDate;
    }

    const balances = await Balance.find(query);
    res.json(balances);
  } catch (error) {
    res.status(500).json({ error: "残高の取得に失敗しました。" });
  }
};

// 残高作成
exports.createBalance = async (req, res) => {
  try {
    const { accountId, balanceDate, balanceAmount, memo } = req.body;
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
    const balanceId = req.params.balanceId;
    const updateFields = req.body;

    console.log(balanceId, updateFields);

    // 残高を更新
    const updatedBalance = await Balance.findByIdAndUpdate(
      balanceId,
      { $set: updateFields },
      { new: true }
    );

    console.log(updatedBalance);

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
    const balanceId = req.params.balanceId;
    const deletedBalance = await Balance.findByIdAndDelete(balanceId);

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
