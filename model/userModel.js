import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
    },
    refreshToken: {
        type: String
    },
    role: {
        type: String,
        default: "subscriber"
    },
    myCourse: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'course'
        }
    ],
    cart: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "cart",
        },
    ],
}, { timestamps: true })



export default mongoose.model('users', userSchema);
