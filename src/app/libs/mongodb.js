import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGO_DB_URI;

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable');
}

/** 
 * Cached connection for MongoDB.
 */
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    if (cached.conn) {
        console.log("Using cached MongoDB connection");
        return cached.conn;
    }

    if (!cached.promise) {
        try {
            cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
                return mongoose;
            });
            console.log("New MongoDB connection established");
        }
        catch (error) {
            console.error("MongoDB connection error:", error);
            cached.promise = null; // Reset promise on error
            throw error; // Rethrow the error after logging
        }
    }
    cached.conn = await cached.promise;
    return cached.conn;
}

export default dbConnect;