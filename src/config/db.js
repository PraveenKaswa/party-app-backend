const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME || 'party_app',
    process.env.DB_USER || 'root',
    process.env.DB_PASSWORD || '',
    {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 3306,
        dialect: 'mysql',
        logging: false, // Set to true to see SQL queries in the console
        // Enable SSL for cloud databases (like Aiven)
        dialectOptions: process.env.DB_HOST && process.env.DB_HOST !== 'localhost' ? {
            ssl: {
                require: true,
                rejectUnauthorized: false // Helps avoid certificate mismatch issues locally
            }
        } : {}
    }
);

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Database connection has been established successfully.');
        
        // Import all models here so Sequelize knows about them before syncing
        const NotifyMeCustomer = require('../models/NotifyMeCustomer');
        const User = require('../models/User');
        const UserAddress = require('../models/UserAddress');

        // Setup Relationships (One-to-Many)
        User.hasMany(UserAddress, { foreignKey: 'userId', as: 'addresses', onDelete: 'CASCADE' });
        UserAddress.belongsTo(User, { foreignKey: 'userId', as: 'user' });

        User.hasMany(NotifyMeCustomer, { foreignKey: 'userId', as: 'waitlistRequests', onDelete: 'CASCADE' });
        NotifyMeCustomer.belongsTo(User, { foreignKey: 'userId', as: 'user' });

        // This will create the tables if they don't exist and alter existing ones to match
        await sequelize.sync({ alter: true });
        console.log('✅ Database synced successfully.');
    } catch (error) {
        console.error('❌ Unable to connect to the database:', error.message);
    }
};

module.exports = { sequelize, connectDB };
