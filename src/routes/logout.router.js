const express = require("express");
const { logout } = require("../app/controllers/AuthController");
const router = express.Router();

router.get("/", logout);

module.exports = router;
