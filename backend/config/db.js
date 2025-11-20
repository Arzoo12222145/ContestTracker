const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        let mongoUri = process.env.MONGO_URI;

        // If no MONGO_URI is provided, start an in-memory MongoDB for local development/tests
        if (!mongoUri) {
            console.log("No MONGO_URI provided — starting in-memory MongoDB for development");
            const { MongoMemoryServer } = require('mongodb-memory-server');
            const mongod = await MongoMemoryServer.create();
            mongoUri = mongod.getUri();
            // Keep a reference so it isn't garbage collected while the app runs
            connectDB.__mongod = mongod;
        }

        const conn = await mongoose.connect(mongoUri);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
