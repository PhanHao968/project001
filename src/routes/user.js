const express = require("express");
const router = express.Router();

const {
    userEdit,
    updatedUser,
    restoreUser,
    deleteUser,
    forceDeleteUser,
    updateUserApproval,
} = require("../app/controllers/UserController");

router.get("/:id/userEdit", userEdit);
router.put("/:id", updatedUser);
router.patch("/:id/restore", restoreUser);
router.delete("/:id", deleteUser);
router.delete("/:id/force", forceDeleteUser);
router.put('/:userId/approval', updateUserApproval);

module.exports = router;
