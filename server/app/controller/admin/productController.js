const { mySlug } = require("../../config/helper");
const { categoryModel } = require("../../model/categoryModel");
const { colorModel } = require("../../model/colorModel");
const { materialModel } = require("../../model/materialModel");
const { productModel } = require("../../model/productModel");
const { subCategoryModel } = require("../../model/SubCategoryModel");
const { subSubCategoryModel } = require("../../model/subSubCategoryModel");

let createProduct = async (req, res) => {
  let obj = { ...req.body };


  if (req.body.upSellProducts) {
    obj.upSellProducts = JSON.parse(req.body.upSellProducts);
  }

 
  //this 2 line for the slug

  let slug = mySlug(obj.productName);

  obj["slug"] = slug;

  if (req.files) {
    if (req.files["productImage"][0].filename) {
      obj["productImage"] = req.files["productImage"][0].filename;
    }

    if (req.files["productGallery"]) {

      let productImages = []
      
      req.files["productGallery"].forEach((value) => {

        productImages.push(value.filename)

      })

      obj["productGallery"] = productImages;
    }


  }

  try {
    let product = productModel(obj);

    let productRes = await product.save();

    res.send({
      _status: true,
      _message: "product Created",
      productRes,
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

let viewProduct = async (req, res) => {
  let filter = {
    isDeleted: false,
  };

  let productData = await productModel
    .find(filter)
    .populate("parentCategory", "categoryName")
    .populate("subCategory", "subCategoryName")
    .populate("subSubCategory", "subSubCategoryName")

  res.send({
    _status: true,
    _message: "Product View",
    path: process.env.PRODUCTPATH,
    productData,
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

let getSubSubCategory = async (req, res) => {
  let { parentID } = req.params;

  let filter = {
    isDeleted: false,
    subSubCategoryStatus: true,
    subCategory: parentID,
  };

  let data = await subSubCategoryModel.find(filter).select("subSubCategoryName");

  res.send({
    _status: true,
    _message: "Sub Sub Category View",
    data,
  });
};

let getColors = async (req, res) => {

  let filter = {
    isDeleted: false,
    colorStatus: true,
  };

  let data = await colorModel.find(filter).select("colorName");

  res.send({
    _status: true,
    _message: "Color View",
    data,
  });
};

let getMaterial = async (req, res) => {

  let filter = {
    isDeleted: false,
    materialStatus: true,
  };

  let data = await materialModel.find(filter).select("materialName");

  res.send({
    _status: true,
    _message: "Material View",
    data,
  });
};

let updateProduct = async (req, res) => {
  let { id } = req.params;

  let obj = { ...req.body };

  if (req.body.upSellProducts) {
    obj.upSellProducts = JSON.parse(req.body.upSellProducts);
  }

  // slug
  let slug = mySlug(obj.productName);
  obj["slug"] = slug;

  // Get old product
  let oldProduct = await productModel.findById(id);

  // Product Main Image
  if (req.files?.["productImage"]) {
    obj["productImage"] = req.files["productImage"][0].filename;
  }

  // Product Gallery Images
  let productImages = [];

  // Remaining old gallery images
  if (req.body.existingGallery) {
    productImages = JSON.parse(req.body.existingGallery);
  } else if (oldProduct.productGallery) {
    productImages = [...oldProduct.productGallery];
  }

  // New gallery images
  if (req.files?.["productGallery"]) {
    req.files["productGallery"].forEach((value) => {
      productImages.push(value.filename);
    });
  }

  obj["productGallery"] = productImages;

  try {
    let productRes = await productModel.updateOne(
      {
        _id: id,
      },
      {
        $set: obj,
      },
    );

    res.send({
      _status: true,
      _message: "Product Updated",
      productRes,
    });
  } catch (dbError) {
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

  let details = await productModel.findOne({ _id: id });

  res.send({
    _status: true,
    _message: "Product Details",
    details,
  });
};

let deleteProduct = async (req, res) => {
  let { id } = req.params;

  let deleteData = await productModel.updateOne(
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
    _message: "Product Deleted",
    deleteData,
  });
};

// this is the soft delete multi delete api

let multiDeleteProduct = async (req, res) => {
  let { ids } = req.body; // {ids: [id1,id2]}

  let deleteData = await productModel.updateMany(
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
    _message: "Product Deleted",
    deleteData,
  });
};

let changeStatusProduct = async (req, res) => {
  let { ids } = req.body; // {ids: [id1,id2]}

  let statusChange = await productModel.updateMany(
    { _id: ids },
    [
      {
        $set: {
          productStatus: {
            $not: "$productStatus",
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
    _message: "Product Status Changed",
    statusChange,
  });
};




module.exports = {
  createProduct,
  viewProduct,
  getParentCategory,
  getSubCategory,
  getSubSubCategory,
  updateProduct,
  getDetails,
  deleteProduct,
  multiDeleteProduct,
  changeStatusProduct,
  getColors,
  getMaterial,
  
};
