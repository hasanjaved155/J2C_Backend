import CategoryModel from "../model/CategoryModel.js";

export const createCategory = async (req, res) => {
  try {
    const { categoryName } = req.body;
    const category = new CategoryModel({
      categoryName,
    });
    await category.save();
    res.status(201).send({
      success: true,
      message: "Category Created Successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in creating Category",
      error,
    });
  }
};

export const getCategory = async (req, res) => {
  try {
    const categories = await CategoryModel.find({});
    res.status(200).send({
      success: true,
      message: "Fetched categories successfully",
      categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching categories",
      error,
    });
  }
};

export const getAllSubSubCategoriesController = async (req, res) => {
  try {
    const categoryId = req.params.id;

    // Fetch the category along with its subcategories
    const category = await CategoryModel.findById(categoryId).populate({
      path: 'subcategories',
      populate: {
        path: 'subsubcategories'
      }
    });

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Extract all subsubcategories
    const subsubcategories = category.subcategories.flatMap(subcategory => subcategory.subsubcategories);

    res.status(200).send({
      success: true,
      message: "Fetched categories successfully",
      subsubcategories,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};