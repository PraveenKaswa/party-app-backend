const app = require("./app");
const { connectDB } = require("./config/db");

const PORT = process.env.PORT || 4003;

// Connect to the database before starting the server
connectDB().then(() => {
    const server = app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });

    server.on('error', (err) => {
        console.error('Server error:', err);
    });
});