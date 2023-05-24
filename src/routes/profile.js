const express = require("express");
const router = express.Router();

const {
    show,
    showClients,
} = require("../app/controllers/ProfileController");

router.get("/", show);
router.get("/:slug",showClients);

module.exports = router;
