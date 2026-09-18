const { mySlug } = require("../../config/helper");
const { categoryModel } = require("../../model/categoryModel");

let createCategory = async (req, res) => {


  let obj = { ...req.body };

  //this 2 line for the slug-> slug means the dynamic value created by using the categoryName in the url 

  let slug = mySlug(obj.categoryName);

  obj["slug"] = slug;


  // and this code for the access the file  image related info in the req.file 

  if (req.file) {
    if (req.file.filename) {
      obj["categoryImage"] = req.file.filename;
    }
  }

  try {
    let category = categoryModel(obj);

    let categoryRes = await category.save();

    res.send({
      _status: true,
      _message: "category Created",
      categoryRes,
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

let viewCategory = async (req, res) => {
  let filter = {
    isDeleted: false,
  };

  let categoryData = await categoryModel.find(filter);

  res.send({
    _status: true,
    _message: "Category View",
    path: process.env.CATEGORYPATH,
    categoryData,
  });
};

let updateCategory = async (req, res) => {
  let { id } = req.params;

  let obj = { ...req.body };

  //this 2 line for the slug

  let slug = mySlug(obj.categoryName);

  obj["slug"] = slug;

  if (req.file) {
    if (req.file.filename) {
      obj["categoryImage"] = req.file.filename;
    }
  }

  try {
    let categoryRes = await categoryModel.updateOne(
      {
        _id: id,
      },
      {
        $set: obj,
      },
    );

    res.send({
      _status: true,
      _message: "category Updated",
      categoryRes,
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

  let details = await categoryModel.findOne({ _id: id });

  res.send({
    _status: true,
    _message: "Category Details",
    details,
  });
};

let deleteCategory = async (req, res) => {
  let { id } = req.params;

  let deleteData = await categoryModel.updateOne(
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
    _message: "Category Deleted",
    deleteData,
  });
};

// this is the soft delete multi delete api

let multiDeleteCategory = async (req, res) => {
  let { ids } = req.body; // {ids: [id1,id2]}

  let deleteData = await categoryModel.updateMany(
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
    _message: "Category Deleted",
    deleteData,
  });
};

let changeStatusCategory = async (req, res) => {
  let { ids } = req.body; // {ids: [id1,id2]}

  let statusChange = await categoryModel.updateMany(
    { _id: ids },
    [
      {
        $set: {
          categoryStatus: {
            $not: "$categoryStatus",
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
    _message: "Category Status Changed",
    statusChange,
  });
};

module.exports = {
  createCategory,
  viewCategory,
  updateCategory,
  getDetails,
  deleteCategory,
  multiDeleteCategory,
  changeStatusCategory,
};
