const Account = require("../models/accounts");
const Balance = require("../models/balances");

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

// アカウントと残高履歴取得
exports.getAccountsWithBalances = async (req, res) => {
  try {
    const accounts = await Account.find();
    // console.log(accounts);
    let resData = [];

    for (const account of accounts) {
      const query = {};
      const accountId = account._id;
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
      let latestBalance = 0;
      let latestDate = null;
      if (balances.length != 0) {
        balances.sort((a, b) => b.balanceDate - a.balanceDate);
        latestBalance = balances[0].balanceAmount;
        latestDate = balances[0].balanceDate;
      }

      const tempAccountWithBalances = {
        _id: account._id,
        accountName: account.accountName,
        accountType: account.accountType,
        ownerId: account.ownerId,
        createdAt: account.createdAt,
        updatedAt: account.updatedAt,
        balances: {
          latestBalance: latestBalance,
          latestDate: latestDate,
          history: balances,
        },
      };

      resData.push(tempAccountWithBalances);
    }

    res.json(resData);
  } catch (error) {
    res.status(500).json({ error: "アカウントの取得に失敗しました。" });
  }
};
