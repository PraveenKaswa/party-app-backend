const notifyService = require('../../services/customer/notify.service');

exports.notifyMe = async (req, res) => {
    try {
        const { userId, lat, lng } = req.body;

        if (!userId || !lat || !lng) {
            return res.status(400).json({ success: false, message: 'userId, lat, and lng are required' });
        }

        const result = await notifyService.addCustomerToNotifyList(req.body);

        return res.status(201).json({
            success: true,
            message: result.isNew ? 'Added to waitlist for this new area' : 'Updated interest in this area',
            data: result
        });
    } catch (error) {
        console.error('Error in notifyMe:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};
