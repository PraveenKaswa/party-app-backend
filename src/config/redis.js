const { createClient } = require('redis');
require('dotenv').config();

const redisClient = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));

// Connect to Redis when the file is loaded
(async () => {
    try {
        await redisClient.connect();
        console.log('✅ Connected to Redis successfully');
    } catch (error) {
        console.error('❌ Redis connection error:', error.message);
    }
})();

module.exports = redisClient;
