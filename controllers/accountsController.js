const Account = require("../models/accounts");

// アカウント一覧取得
exports.getAccount = async (req, res) => {
  try {
    const accounts = await Account.find();
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ error: "アカウントの取得に失敗しました。" });
  }
};

// アカウント取得（ByAccountId）
exports.getAccountByAccountId = async (req, res) => {
  try {
    const accountId = req.params.accountId;
    const account = await Account.findById(accountId);
    res.json(account);
  } catch (error) {
    res.status(500).json({ error: "アカウントの取得に失敗しました。" });
  }
};

// アカウント作成
exports.createAccount = async (req, res) => {
  try {
    const { accountName, accountType, ownerId } = req.body;
    const newAccount = new Account({ accountName, accountType, ownerId });
    await newAccount.save();

    res.json({ message: "アカウントが登録されました。", account: newAccount });
  } catch (error) {
    res.status(500).json({ error: "アカウントの登録に失敗しました。" });
  }
};

// アカウント更新
exports.updateAccount = async (req, res) => {
  try {
    const accountId = req.params.accountId;
    const updateFields = req.body;

    // アカウントを更新
    const updatedAccount = await Account.findByIdAndUpdate(
      accountId,
      { $set: updateFields },
      { new: true }
    );
    if (!updatedAccount) {
      return res.status(404).json({ message: "アカウントが見つかりません。" });
    }

    res.json({
      message: "アカウントが更新されました。",
      account: updatedAccount,
    });
  } catch (error) {
    res.status(500).json({ error: "アカウントの更新に失敗しました。" });
  }
};

// アカウント削除
exports.deleteAccount = async (req, res) => {
  try {
    const accountId = req.params.accountId;
    const deletedAccount = await Account.findByIdAndDelete(accountId);

    if (!deletedAccount) {
      return res.status(404).json({ message: "アカウントが見つかりません。" });
    }

    res.json({
      message: "アカウントが削除されました。",
      account: deletedAccount,
    });
  } catch (error) {
    res.status(500).json({ error: "アカウントの削除に失敗しました。" });
  }
};
