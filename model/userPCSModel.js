import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: Number,
      required: true,
    },
    employeeId: {
      type: Number,
      required: true,
    },
    dateOfJoining: {
      type: Date,
      required: true,
    },
    role: {
      type: String,
      default: "Employee",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    assignedCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "course",
      },
    ],

    employeeDetails: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "employeeinformation",
      },
    ],
    cart: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "cart",
      },
    ],
    refreshToken: {
      type: String
    }
  },
  { timestamps: true }
);
export default mongoose.model("userpcs", userSchema);
