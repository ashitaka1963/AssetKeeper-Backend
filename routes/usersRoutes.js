const express = require("express");
const router = express.Router();
const userController = require("../controllers/usersController");

// ユーザー作成のルートハンドラー
router.get("/users", userController.getUser);
// router.get("/users/:userName", userController.getUserByUserName);
router.get("/users/:userId", userController.getUserByUserId);
router.post("/users", userController.createUser);
router.patch("/users/:userId", userController.updateUser);
router.delete("/users/:userId", userController.deleteUser);

module.exports = router;
