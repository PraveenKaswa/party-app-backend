const { calculateDistanceInKm } = require("../../utils/distance");
const { getSettings } = require("../../utils/settingsStore");

exports.checkDeliveryEligibility = (customerLat, customerLng) => {
    const settings = getSettings();
    
    const distance = calculateDistanceInKm(
        settings.warehouseLat,
        settings.warehouseLng,
        parseFloat(customerLat),
        parseFloat(customerLng)
    );

    return {
        isEligible: distance <= settings.maxDeliveryRadiusKm,
        distanceInKm: parseFloat(distance.toFixed(2)),
        maxRadius: settings.maxDeliveryRadiusKm
    };
};
