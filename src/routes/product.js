const express = require('express');
const router = express.Router();
const { authen, protectAdmin } = require('../app/middleware/check_auth');
const { storeProduct, trashProduct  } = require('../app/controllers/DashboardController');
const { show,create,store,edit,update, destroy, restore, forceDestroy} = require('../app/controllers/ProductController');

router.get("/storeproduct", storeProduct);
router.get("/trashproduct", trashProduct);

router.get("/:slug", show);

router.get('/create', create);
router.post('/store', store);
router.get('/:id/edit', edit);
router.put('/:id', update);
router.patch('/:id/restore', restore);
router.delete('/:id', destroy);
router.delete('/:id/force', forceDestroy);

module.exports = router;