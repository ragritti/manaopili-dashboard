import mongoose from "mongoose"

const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI)
        console.log("MongoDB succesfully connected", process.env.MONGO_DB_URI)
    } catch (error) {
        console.log("Failed to connect to MongoDB", error)
    }
}

export default connectMongoDB;