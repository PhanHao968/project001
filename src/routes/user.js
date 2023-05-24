const express = require("express");
const router = express.Router();

const {
    showRegister,
    store,
    userEdit,
    updatedUser,
    restoreUser,
    deleteUser,
    forceDeleteUser,
} = require("../app/controllers/UserController");

router.get("/register", showRegister);
router.post("/store", store);
router.get("/:id/userEdit", userEdit);
router.put("/:id", updatedUser);
router.patch("/:id/restore", restoreUser);
router.delete("/:id", deleteUser);
router.delete("/:id/force", forceDeleteUser);

module.exports = router;
