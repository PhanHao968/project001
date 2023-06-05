const express = require('express');
const router = express.Router();
const {
    create, store, storeContent02, editContent, update, destroy, trashContent02, restore, forceDestroy,updateContent02Approval
} = require('../app/controllers/Content02Controller');
const { upload } = require('../app/middleware/upload');


router.get("/storecontent", storeContent02);

router.get('/create', create);
router.post('/store', upload.single('img'), store);
router.get('/:id/editcontent02', editContent);
router.put('/:id/update', upload.single('img'), update);
router.patch('/:id/restore', restore);
router.get('/trashcontent', trashContent02);
router.delete('/:id', destroy);
router.delete('/:id/force', forceDestroy);
router.put('/:content02Id/approval', updateContent02Approval);

module.exports = router;