import mongoose from "mongoose";

const contacthelpSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    message: {
        type: String,
        required: true
    },


}, { timestamps: true })



export default mongoose.model('contact', contacthelpSchema);
