import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        link: {
            type: String,
            required: true,
            trim: true,
        },
        image: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            default: 1 // Default quantity is 1
        }

    },
    { timestamps: true }
);

export default mongoose.model("cart", userSchema);
