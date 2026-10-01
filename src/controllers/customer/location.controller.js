const locationService = require("../../services/customer/location.service");

exports.checkDelivery = (req, res) => {
    try {
        const { lat, lng } = req.body;

        if (!lat || !lng) {
            return res.status(400).json({
                success: false,
                message: "Please provide both lat and lng coordinates"
            });
        }

        const result = locationService.checkDeliveryEligibility(lat, lng);

        return res.status(200).json({
            success: true,
            data: result,
            message: result.isEligible 
                ? "Location is within our delivery radius." 
                : "Sorry, this location is outside our delivery area."
        });
    } catch (error) {
        console.error("Error in checkDelivery:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error while checking location"
        });
    }
};
