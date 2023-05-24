const express = require('express');
const router = express.Router();

const {
    show,
} = require('../app/controllers/LandingController');

router.get('/', show)

module.exports = router;
