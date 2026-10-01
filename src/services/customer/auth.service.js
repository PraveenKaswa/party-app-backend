const redisClient = require('../../config/redis');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

const OTP_EXPIRY = 60; // 5 minutes in seconds

exports.sendOtp = async (phoneNumber) => {
    // Generate a 4-digit OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    // Save to Redis: key = otp_<phoneNumber>
    await redisClient.setEx(`otp_${phoneNumber}`, OTP_EXPIRY, otp);

    // TODO: Integrate actual SMS gateway (Twilio/MSG91/etc) here. For now, log it.
    console.log(`[SMS MOCK] Sent OTP ${otp} to ${phoneNumber}`);

    return { statusCode: 200, success: true, message: 'OTP sent successfully', data: { expireTimeInSeconds: OTP_EXPIRY } };
};

exports.resendOtp = async (phoneNumber) => {
    // Generate a new 4-digit OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    // Refresh in Redis with new OTP and expiration reset
    await redisClient.setEx(`otp_${phoneNumber}`, OTP_EXPIRY, otp);

    // TODO: Integrate actual SMS gateway (Twilio/MSG91/etc) here. For now, log it.
    console.log(`[SMS MOCK] Resent OTP ${otp} to ${phoneNumber}`);

    return { statusCode: 200, success: true, message: 'OTP resent successfully', data: { expireTimeInSeconds: OTP_EXPIRY } };
};

exports.verifyOtp = async (phoneNumber, otp) => {
    const storedOtp = await redisClient.get(`otp_${phoneNumber}`);

    if (!storedOtp) {
        return { statusCode: 400, success: false, message: 'OTP expired or invalid' };
    }

    if (storedOtp !== otp) {
        return { statusCode: 400, success: false, message: 'Incorrect OTP' };
    }

    // OTP matched, delete it from Redis so it can't be reused
    await redisClient.del(`otp_${phoneNumber}`);

    // Find existing user or create a new one
    let [user, created] = await User.findOrCreate({
        where: { phoneNumber }
    });

    // Generate JWT
    const token = jwt.sign(
        { id: user.id, phoneNumber: user.phoneNumber },
        process.env.JWT_SECRET || 'super_secret_party_key',
        { expiresIn: '30d' }
    );

    return { statusCode: 200, success: true, message: 'Login successful', data: { user, token, isNewUser: created } };
};
