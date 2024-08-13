import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    path: {
        type: String,
        required: true,
        trim: true
    },

    courseName: {
        type: String,
        required: true
    },
    folderId: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
    },

    courseTitle: {
        type: String,
        required: true,
        trim: true
    },
    finalRating: {
        type: Number,
        default: 0
    },
    courseInfo: {
        type: String,
        required: true,
    },
    authorName: {
        type: String,
        required: true,
    },
    // viewCount: {
    //     type: Number,
    //     default: 0
    // },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    role: [
        {
            rolename: {
                type: String,
                enum: ["Employee", "Buyer"], // Restrict values to "Employee" or "Buyer"
                required: true,
            },
        },
    ],
}, { timestamps: true })



export default mongoose.model('course', userSchema);
