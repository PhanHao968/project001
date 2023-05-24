const express = require("express");
const router = express.Router();
const { upload } = require('../app/middleware/upload');
const {
    edit,
    update,
} = require("../app/controllers/SettingController");

router.get("/", edit);
router.put("/:userId", upload.single('avatar'), update);
module.exports = router;
