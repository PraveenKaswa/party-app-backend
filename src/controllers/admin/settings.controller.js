const { updateSettings, getSettings } = require("../../utils/settingsStore");

exports.updateDeliverySettings = (req, res) => {
    try {
        const { lat, lng, radiusKm } = req.body;

        if (lat === undefined || lng === undefined || radiusKm === undefined) {
            return res.status(400).json({
                success: false,
                message: "Please provide lat, lng, and radiusKm"
            });
        }

        const updatedSettings = updateSettings({
            warehouseLat: parseFloat(lat),
            warehouseLng: parseFloat(lng),
            maxDeliveryRadiusKm: parseFloat(radiusKm)
        });

        return res.status(200).json({
            success: true,
            message: "Delivery settings updated successfully",
            data: updatedSettings
        });
    } catch (error) {
        console.error("Error updating settings:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

exports.getDeliverySettings = (req, res) => {
    try {
        const settings = getSettings();
        return res.status(200).json({
            success: true,
            data: settings
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};
