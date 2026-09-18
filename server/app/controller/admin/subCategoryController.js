const { mySlug } = require("../../config/helper");
const { categoryModel } = require("../../model/categoryModel");
const { subCategoryModel } = require("../../model/SubCategoryModel");

let createSubCategory = async (req, res) => {
  let obj = { ...req.body };

  //this 2 line for the slug

  let slug = mySlug(obj.subCategoryName);

  obj["slug"] = slug;

  if (req.file) {
    if (req.file.filename) {
      obj["subCategoryImage"] = req.file.filename;
    }
  }

  try {
    let subCategory = subCategoryModel(obj);

    let subCategoryRes = await subCategory.save();

    res.send({
      _status: true,
      _message: "sub Category Created",
      subCategoryRes,
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

let viewSubCategory = async (req, res) => {
  let filter = {
    isDeleted: false,
  };

  let subCategoryData = await subCategoryModel
    .find(filter)
    .populate("parentCategory", "categoryName");

  res.send({
    _status: true,
    _message: "subCategory View",
    path: process.env.SUBCATEGORYPATH,
    subCategoryData,
  });
};


let getParentCategory = async (req,res) => {

    let filter = {
      isDeleted: false,
      categoryStatus: true,
    };


    let data = await categoryModel.find(filter).select("categoryName")

    res.send({
      _status: true,
      _message: "subCategory View",
      data,
    });
}

let updateSubCategory = async (req, res) => {

  let {id} = req.params

  let obj = { ...req.body };

  //this 2 line for the slug

  let slug = mySlug(obj.subCategoryName);

  obj["slug"] = slug;

  if (req.file) {
    if (req.file.filename) {
      obj["subCategoryImage"] = req.file.filename;
    }
  }

  try {

    let subCategoryRes = await subCategoryModel.updateOne(
      {
        _id: id
      },
      {
        $set: obj
      }
    )

    res.send({
      _status: true,
      _message: "sub Category Updated",
      subCategoryRes,
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

let getDetails = async (req,res) => {

  let {id} = req.params

  let details = await subCategoryModel.findOne({_id: id})

  res.send({
    _status: true,
    _message: "Sub Category Details",
    details
  })

}


let deleteSubCategory = async (req, res) => {
  let { id } = req.params;

  let deleteData = await subCategoryModel.updateOne(
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
    _message: "Sub Category Deleted",
    deleteData,
  });
};

// this is the soft delete multi delete api

let multiDeleteSubCategory = async (req, res) => {
  let { ids } = req.body; // {ids: [id1,id2]}

  let deleteData = await subCategoryModel.updateMany(
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
    _message: "Sub Category Deleted",
    deleteData,
  });
};

let changeStatusSubCategory = async (req, res) => {
  let { ids } = req.body; // {ids: [id1,id2]}

  let statusChange = await subCategoryModel.updateMany(
    { _id: ids },
    [
      {
        $set: {
          subCategoryStatus: {
            $not: "$subCategoryStatus",
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
    _message: "Sub Category Status Changed",
    statusChange,
  });
};


module.exports = {
  createSubCategory,
  viewSubCategory,
  getParentCategory,
  updateSubCategory,
  getDetails,
  deleteSubCategory,
  multiDeleteSubCategory,
  changeStatusSubCategory,
};
