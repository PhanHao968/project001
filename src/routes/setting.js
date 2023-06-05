const express = require("express");
const router = express.Router();
const { upload } = require('../app/middleware/upload');
const {
    edit,
    update,
    editProfile,
    updateProfile,
} = require("../app/controllers/SettingController");

router.get("/", edit);
router.put("/:userId", upload.single('avatar'), update);
router.get("/:id/editprofile", editProfile);
router.put("/:id/updateprofile", upload.single('avatar'), updateProfile);
module.exports = router;
