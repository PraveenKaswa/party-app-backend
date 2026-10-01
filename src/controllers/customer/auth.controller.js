const authService = require('../../services/customer/auth.service');
const User = require('../../models/User');

exports.checkUser = async (req, res) => {
    try {
        const { phoneNumber } = req.body;
        if (!phoneNumber) {
            return res.status(400).json({ success: false, message: 'Phone number is required' });
        }

        // Find existing user or create a new one
        const [user, created] = await User.findOrCreate({
            where: { phoneNumber }
        });

        return res.status(200).json({
            success: true,
            message: created ? 'User created successfully' : 'User already exists',
            user,
            isNewUser: created
        });
    } catch (error) {
        console.error('Error checking user:', error);
        return res.status(500).json({ success: false, message: 'Failed to process user' });
    }
};

exports.sendOtp = async (req, res) => {
    try {
        const { phoneNumber } = req.body;
        if (!phoneNumber) {
            return res.status(400).json({ success: false, message: 'Phone number is required' });
        }

        const result = await authService.sendOtp(phoneNumber);
        
        return res.status(result.statusCode || 200).json(result);
    } catch (error) {
        console.error('Error sending OTP:', error);
        return res.status(500).json({ success: false, message: 'Failed to send OTP' });
    }
};

exports.resendOtp = async (req, res) => {
    try {
        const { phoneNumber } = req.body;
        if (!phoneNumber) {
            return res.status(400).json({ success: false, message: 'Phone number is required' });
        }

        const result = await authService.resendOtp(phoneNumber);
        
        return res.status(result.statusCode || 200).json(result);
    } catch (error) {
        console.error('Error resending OTP:', error);
        return res.status(500).json({ success: false, message: 'Failed to resend OTP' });
    }
};

exports.verifyOtp = async (req, res) => {
    try {
        const { phoneNumber, otp } = req.body;
        if (!phoneNumber || !otp) {
            return res.status(400).json({ success: false, message: 'Phone number and OTP are required' });
        }

        const result = await authService.verifyOtp(phoneNumber, otp);

        return res.status(result.statusCode || 200).json(result);
    } catch (error) {
        console.error('Error verifying OTP:', error);
        return res.status(500).json({ success: false, message: error.message });
    }
};
