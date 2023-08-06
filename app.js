// TODO:openapiのDescription見直し

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// 特定のオリジンを許可する
const allowedOrigins = ["http://localhost:5173"];
app.use(
  cors({
    origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

// POSTリクエストを処理するためのミドルウェア
app.use(express.json());

const port = process.env.PORT || 3000;

const openapiRouter = require("./routes/openapi");
app.use(openapiRouter);

const userRoutes = require("./routes/usersRoutes");
app.use(userRoutes);

const accountRoutes = require("./routes/accountsRoutes");
app.use(accountRoutes);

const balanceRoutes = require("./routes/balancesRoutes");
app.use(balanceRoutes);

// MongoDBに接続
mongoose
  .connect("mongodb://127.0.0.1:27017/AssetKeeper", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.get("/hello", (req, res) => {
  res.send("Hello, Express!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
