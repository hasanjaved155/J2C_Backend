import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    rating: {
        type: Number,
        min: 0,
        max: 10,
        default: 1
    },
    comment: {
        type: String,
        maxLength: 200,
    }
}, { versionKey: false, timestamps: true });

export default mongoose.model('Review', reviewSchema);

