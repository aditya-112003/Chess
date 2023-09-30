import mongoose from "mongoose";
 
export const connnectToMongoDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI is not defined in the environment variables.");
        }
        await mongoose.connect(process.env.MONGODB_URI );
        console.log("Connected to MongoDB");
    } catch (error) { 
        console.log("MongoDB connection error" , error);
    }
}