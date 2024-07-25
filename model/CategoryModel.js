import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
  },
  subcategories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subcategory",
    },
  ],
});

export default mongoose.model("Category", categorySchema);
