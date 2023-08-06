const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../openapi.json");

const router = express.Router();

router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = router;
