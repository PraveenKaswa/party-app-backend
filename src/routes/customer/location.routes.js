const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");
const locationController = require("../../controllers/customer/location.controller");

// Create a rate limiter: maximum 5 requests per 15 minutes
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 requests per `window` (here, per 15 minutes)
    message: {
        success: false,
        message: "Too many requests from this IP, please try again after 15 minutes"
    }
});

router.post("/check-delivery", apiLimiter, locationController.checkDelivery);

module.exports = router;
