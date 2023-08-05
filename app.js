const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./openapi.json");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

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

// Swagger UIの設定
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/hello", (req, res) => {
  res.send("Hello, Express!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
