import mongoose from "mongoose";

const subsubcategorySchema = new mongoose.Schema({
  subSubCategoryName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true
  }
});

export default mongoose.model("Subsubcategory", subsubcategorySchema);
