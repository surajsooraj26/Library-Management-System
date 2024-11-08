const express = require("express");
const router = express.Router();
const { loginfunction, test } = require("../controllers/adminController");

router.post("/admin-login", loginfunction);

module.exports = router;
