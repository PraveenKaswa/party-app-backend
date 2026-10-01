const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const NotifyMeCustomer = sequelize.define('NotifyMeCustomer', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    street: { type: DataTypes.STRING, allowNull: true },
    district: { type: DataTypes.STRING, allowNull: true },
    city: { type: DataTypes.STRING, allowNull: true },
    state: { type: DataTypes.STRING, allowNull: true },
    country: { type: DataTypes.STRING, allowNull: true },
    pincode: { type: DataTypes.STRING, allowNull: true },
    lat: { type: DataTypes.STRING, allowNull: false },
    lng: { type: DataTypes.STRING, allowNull: false },
    requestsCount: { type: DataTypes.INTEGER, defaultValue: 1 }
}, {
    tableName: 'notify_me_customers',
    timestamps: true
});

module.exports = NotifyMeCustomer;
