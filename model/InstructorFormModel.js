import mongoose from "mongoose";


const instructorformSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
    },
    title: {
        type: String,
        required: true,
    },
    learn: {
        type: String,
        required: true,
    },
    requirements: {
        type: String,
        required: true,
    },
    courseTarget: {
        type: String,
        required: true,
    },

    timeCommitment: {
        type: String,
        required: true,
    },
}, { timestamps: true });

export default mongoose.model('instructorform', instructorformSchema);
