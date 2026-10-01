const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const UserAddress = sequelize.define('UserAddress', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    label: {
        type: DataTypes.STRING, // "Home", "Work", etc.
        allowNull: true,
        defaultValue: 'Home'
    },
    street: {
        type: DataTypes.STRING,
        allowNull: false
    },
    district: {
        type: DataTypes.STRING,
        allowNull: true
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pincode: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lat: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lng: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isDefault: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    tableName: 'user_addresses',
    timestamps: true
});

module.exports = UserAddress;
