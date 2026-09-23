const { subCategoryModel } = require("../../model/SubCategoryModel");

let websiteSubCategory = async (req, res) => {
  try {
    let filter = {
      isDeleted: false,
      subCategoryStatus: true,
    };

    if (req.query.parentCategory) {
      filter.parentCategory = req.query.parentCategory;
    }

    let subCategoryData = await subCategoryModel
      .find(filter)
      .populate("parentCategory", "categoryName")
      .sort({ subCategoryOrder: 1 });

    res.send({
      _status: true,
      _message: "Sub Category Data Found",
      subCategoryData,
    });
  } catch (error) {
    console.log("WEBSITE SUB CATEGORY ERROR:", error);

    res.send({
      _status: false,
      _message: "Something went wrong",
      errors: [{ error: error.message }],
    });
  }
};

module.exports = { websiteSubCategory };
