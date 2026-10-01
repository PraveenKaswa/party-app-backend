const fs = require('fs');
const path = require('path');

const settingsPath = path.join(__dirname, '../config/settings.json');

const getSettings = () => {
    try {
        if (!fs.existsSync(settingsPath)) {
            return {
                warehouseLat: parseFloat(process.env.WAREHOUSE_LAT || "28.6139"),
                warehouseLng: parseFloat(process.env.WAREHOUSE_LNG || "77.2090"),
                maxDeliveryRadiusKm: 40000000000
            };
        }
        const data = fs.readFileSync(settingsPath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading settings:", error);
        return { warehouseLat: 28.6139, warehouseLng: 77.2090, maxDeliveryRadiusKm: 4 };
    }
};

const updateSettings = (newSettings) => {
    const currentSettings = getSettings();
    const updatedSettings = { ...currentSettings, ...newSettings };
    fs.writeFileSync(settingsPath, JSON.stringify(updatedSettings, null, 2));
    return updatedSettings;
};

module.exports = {
    getSettings,
    updateSettings
};
