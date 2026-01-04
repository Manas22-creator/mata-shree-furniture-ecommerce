// server/config/db.js (Corrected Version)

const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Attempt to connect to the MongoDB cluster with no extra options
        await mongoose.connect(process.env.MONGO_URI);

        console.log('MongoDB Connected...');
    } catch (err) {
        console.error(err.message);
        // Exit process with failure
        process.exit(1);
    }
};

module.exports = connectDB;