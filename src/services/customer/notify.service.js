const NotifyMeCustomer = require('../../models/NotifyMeCustomer');
const { calculateDistanceInKm } = require('../../utils/distance');

exports.addCustomerToNotifyList = async (data) => {
    const { userId, street, district, city, state, country, pincode, lat, lng } = data;

    // Get all previous requests for this user
    const existingRequests = await NotifyMeCustomer.findAll({
        where: { userId }
    });

    // Check if any existing request is within 100 meters (0.1 km)
    let duplicateRequest = null;
    for (const request of existingRequests) {
        const distance = calculateDistanceInKm(parseFloat(lat), parseFloat(lng), parseFloat(request.lat), parseFloat(request.lng));
        if (distance <= 0.1) { // 100 meters
            duplicateRequest = request;
            break;
        }
    }

    if (duplicateRequest) {
        // Just increment the counter, don't create a duplicate row
        duplicateRequest.requestsCount += 1;
        await duplicateRequest.save();
        return { isNew: false, request: duplicateRequest };
    }

    // Insert new record if it's a completely new location for them (>100m away)
    const newRequest = await NotifyMeCustomer.create({
        userId,
        street,
        district,
        city,
        state,
        country,
        pincode,
        lat,
        lng
    });

    return { isNew: true, request: newRequest };
};
