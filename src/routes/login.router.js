const express = require("express");
const { showLogin, login } = require("../app/controllers/AuthController");
const { authorization } = require("../app/middleware/check_auth");
const router = express.Router();

router.get("/", showLogin);
router.post("/", login, authorization);

module.exports = router;
