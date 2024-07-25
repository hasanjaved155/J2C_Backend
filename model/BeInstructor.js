import mongoose from "mongoose";

const instructorSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            trim: true,
        },
        phone: {
            type: String,
            required: true,
            trim: true,
        },
        domain: {
            type: String,
            required: true,
            trim: true,
        },
        category: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
            trim: true,
        },
        message: {
            type: String,
            required: true,
            trim: true,
        },
        access: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);
export default mongoose.model("teach", instructorSchema);
