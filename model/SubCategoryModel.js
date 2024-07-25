import mongoose from "mongoose";

const subcategorySchema = new mongoose.Schema({
  subCategoryName: {
    type: String,
    required: true,
  },

  subsubcategories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subsubcategory",
    },
  ],
});

export default mongoose.model("Subcategory", subcategorySchema);
