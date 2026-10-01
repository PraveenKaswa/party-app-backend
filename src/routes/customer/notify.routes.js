const express = require('express');
const router = express.Router();
const notifyController = require('../../controllers/customer/notify.controller');
const rateLimit = require("express-rate-limit");

// Prevent spamming
const notifyLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 10,
    message: { success: false, message: 'Too many requests, try again later.' }
});

router.post('/subscribe', notifyLimiter, notifyController.notifyMe);

module.exports = router;
