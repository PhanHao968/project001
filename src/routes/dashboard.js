const express = require("express");
const router = express.Router();

const {
    storeUsersTable,
    trashUsers,
} = require("../app/controllers/TableController");

const {
    show,
} = require("../app/controllers/DashboardController");

router.get("/store", storeUsersTable);
router.get("/trash", trashUsers);
router.get("/", show);

module.exports = router;
