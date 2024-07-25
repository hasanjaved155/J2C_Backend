import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL);
        console.log("Database Connected Successfully");
    } catch (error) {
        console.log("Error in Connecting Database");
    }
};

export default connectDB;