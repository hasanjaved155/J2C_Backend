import mongoose from "mongoose";

const descriptionSchema = new mongoose.Schema(
    {
        path: {
            type: String,
            required: true,
            trim: true,
        },
        heading: {
            type: String,
            required: true,
            trim: true,
        },
        paragraph: {
            type: String,
            required: true,
            trim: true,
        },
        leftDescription: {
            type: String,
            required: true,
            trim: true,
        },
        rightDescription: {
            type: String,
            required: true,
            trim: true,
        }

    },
    { timestamps: true }
);

export default mongoose.model("description", descriptionSchema);
