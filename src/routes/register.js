const express = require("express");
const router = express.Router();

const {
    showRegister,
    store,
} = require("../app/controllers/UserController");

router.get("/", showRegister);
router.post("/store", store);

module.exports = router;
