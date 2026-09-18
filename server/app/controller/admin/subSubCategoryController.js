const { mySlug } = require("../../config/helper");
const { categoryModel } = require("../../model/categoryModel");
const { subCategoryModel } = require("../../model/SubCategoryModel");
const { subSubCategoryModel } = require("../../model/subSubCategoryModel");

let createSubSubCategory = async (req, res) => {
  let obj = { ...req.body };

  //this 2 line for the slug

  let slug = mySlug(obj.subSubCategoryName);

  obj["slug"] = slug;

  if (req.file) {
    if (req.file.filename) {
      obj["subSubCategoryImage"] = req.file.filename;
    }
  }

  try {
    let subSubCategory = subSubCategoryModel(obj);

    let subSubCategoryRes = await subSubCategory.save();

    res.send({
      _status: true,
      _message: "sub Sub Category Created",
      subSubCategoryRes,
    });
  } catch (dbError) {
    // console.log("this is teh error", dbError.errors);

    let errors = [];
    let obj = {};

    for (let errorkey in dbError.errors) {
      obj[errorkey] = dbError.errors[errorkey].message;
      errors.push(obj);
      obj = {};
    }

    res.send({
      _status: false,
      _message: "Error Found...",
      errors,
    });
  }
};

let viewSubSubCategory = async (req, res) => {
  let filter = {
    isDeleted: false,
  };

  let subSubCategoryData = await subSubCategoryModel
    .find(filter)
    .populate("parentCategory", "categoryName")
    .populate("subCategory", "subCategoryName");

  res.send({
    _status: true,
    _message: "subSubCategory View",
    path: process.env.SUBSUBCATEGORYPATH,
    subSubCategoryData,
  });
};

let getParentCategory = async (req, res) => {
  let filter = {
    isDeleted: false,
    categoryStatus: true,
  };

  let data = await categoryModel.find(filter).select("categoryName");

  res.send({
    _status: true,
    _message: "Parent Category View",
    data,
  });
};

let getSubCategory = async (req, res) => {
  
  let { parentID } = req.params;

  let filter = {
    isDeleted: false,
    subCategoryStatus: true,
    parentCategory: parentID,
  };

  let data = await subCategoryModel.find(filter).select("subCategoryName");

  res.send({
    _status: true,
    _message: "Sub Category View",
    data,
  });
};

let updateSubSubCategory = async (req, res) => {
  let { id } = req.params;

  let obj = { ...req.body };

  //this 2 line for the slug

  let slug = mySlug(obj.subSubCategoryName);

  obj["slug"] = slug;

  if (req.file) {
    if (req.file.filename) {
      obj["subSubCategoryImage"] = req.file.filename;
    }
  }

  try {
    let subSubCategoryRes = await subSubCategoryModel.updateOne(
      {
        _id: id,
      },
      {
        $set: obj,
      },
    );

    res.send({
      _status: true,
      _message: "sub Sub Category Updated",
      subSubCategoryRes,
    });
  } catch (dbError) {
    // console.log("this is teh error", dbError.errors);

    let errors = [];
    let obj = {};

    for (let errorkey in dbError.errors) {
      obj[errorkey] = dbError.errors[errorkey].message;
      errors.push(obj);
      obj = {};
    }

    res.send({
      _status: false,
      _message: "Error Found...",
      errors,
    });
  }
};

let getDetails = async (req, res) => {
  let { id } = req.params;

  let details = await subSubCategoryModel.findOne({ _id: id });

  res.send({
    _status: true,
    _message: "Sub Sub Category Details",
    details,
  });
};

let deleteSubSubCategory = async (req, res) => {
  let { id } = req.params;

  let deleteData = await subSubCategoryModel.updateOne(
    { _id: id },
    {
      $set: {
        isDeleted: true,
        deletedAt: Date.now(),
      },
    },
  );

  res.send({
    _status: true,
    _message: "Sub Sub Category Deleted",
    deleteData,
  });
};

// this is the soft delete multi delete api

let multiDeleteSubSubCategory = async (req, res) => {
  let { ids } = req.body; // {ids: [id1,id2]}

  let deleteData = await subSubCategoryModel.updateMany(
    { _id: ids },
    {
      $set: {
        isDeleted: true,
        deletedAt: Date.now(),
      },
    },
  );

  res.send({
    _status: true,
    _message: "Sub Sub Category Deleted",
    deleteData,
  });
};

let changeStatusSubSubCategory = async (req, res) => {
  let { ids } = req.body; // {ids: [id1,id2]}

  let statusChange = await subSubCategoryModel.updateMany(
    { _id: ids },
    [
      {
        $set: {
          subSubCategoryStatus: {
            $not: "$subSubCategoryStatus",
          },
        },
      },
    ],

    {
      updatePipeline: true,
    },
  );

  res.send({
    _status: true,
    _message: "Sub Sub Category Status Changed",
    statusChange,
  });
};

module.exports = {
  createSubSubCategory,
  viewSubSubCategory,
  getParentCategory,
  getSubCategory,
  updateSubSubCategory,
  getDetails,
  deleteSubSubCategory,
  multiDeleteSubSubCategory,
  changeStatusSubSubCategory,
};
