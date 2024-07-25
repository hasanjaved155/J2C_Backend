import CategoryModel from "../model/CategoryModel.js";
import SubCategoryModel from "../model/SubCategoryModel.js";

export const createSubCategory = async (req, res) => {
  try {
    const { subCategoryName, categoryId } = req.body;
    const subcategory = new SubCategoryModel({
      subCategoryName,
      categoryId,
    });

    // Push subcategory into selected category
    await CategoryModel.findByIdAndUpdate(categoryId, {
      $push: { subcategories: subcategory._id },
    });

    await subcategory.save();
    res.status(201).send({
      success: true,
      message: "SubCategory Created Successfully",
      subcategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in creating SubCategory",
      error,
    });
  }
};

export const getSubCategory = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const category = await CategoryModel.findById(categoryId).populate(
      "subcategories"
    );
    const subcategory = category.subcategories;
    //console.log(subcategory);
    res.status(200).send({
      success: true,
      message: "Fetched subcategories successfully",
      subcategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching subcategories",
      error,
    });
  }
};
