const express = require('express');
const router = express.Router();
const authController = require('../../controllers/customer/auth.controller');

router.post('/send-otp', authController.sendOtp);
router.post('/resend-otp', authController.resendOtp);
router.post('/verify-otp', authController.verifyOtp);
router.post('/check-user', authController.checkUser);

module.exports = router;
