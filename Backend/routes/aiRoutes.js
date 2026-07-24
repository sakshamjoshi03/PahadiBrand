const express = require("express");
const { chatWithBhula } = require("../controllers/aiController");

const router = express.Router();

router.post("/chat", chatWithBhula);

module.exports = router;