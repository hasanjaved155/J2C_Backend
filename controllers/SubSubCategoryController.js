import SubCategoryModel from "../model/SubCategoryModel.js";
import SubSubCategoryModel from "../model/SubSubCategoryModel.js";

export const createSubSubCategory = async (req, res) => {
  try {
    const { subSubCategoryName, categoryId, subcategoryId, image } = req.body;
    const subsubcategory = new SubSubCategoryModel({
      subSubCategoryName,
      categoryId,
      subcategoryId,
      image,
    });

    // Push subsubcategory into selected subcategory
    await SubCategoryModel.findByIdAndUpdate(subcategoryId, {
      $push: { subsubcategories: subsubcategory._id },
    });
    await subsubcategory.save();

    res.status(201).send({
      success: true,
      message: "SubSubCategory Created Successfully",
      subsubcategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in creating SubSubCategory",
      error,
    });
  }
};

export const getSubSubCategory = async (req, res) => {
  const { subcategoryId } = req.params;
  try {
    const subcategory = await SubCategoryModel.findById(subcategoryId).populate(
      "subsubcategories"
    );
    const subsubcategory = subcategory.subsubcategories;
    //console.log(subcategory);
    res.status(200).send({
      success: true,
      message: "Fetched subcategories successfully",
      subsubcategory,
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
