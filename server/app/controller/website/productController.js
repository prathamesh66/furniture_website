const { productModel } = require("../../model/productModel");

// Common function for getting products
let getProductData = async (filter, res, message) => {
  try {
    let productData = await productModel
      .find({
        ...filter,
        isDeleted: false,
        productStatus: true,
      })
      .populate("parentCategory", "categoryName")
      .populate("subCategory", "subCategoryName")
      .populate("subSubCategory", "subSubCategoryName")
      .populate("material", "materialName")
      .populate("color", "colorName")
      .sort({ productOrder: 1 });

    res.send({
      _status: true,
      _message: message,
      path: process.env.PRODUCTPATH,
      productData: productData,
    });
  } catch (error) {
    console.log(error);

    res.send({
      _status: false,
      _message: "Something Went Wrong",
      error: error.message,
    });
  }
};

// Get all products
let viewProduct = async (req, res) => {
  await getProductData({}, res, "Product View");
};

// Get Featured Products
let viewFeaturedProduct = async (req, res) => {
  await getProductData(
    { productType: "featured" },
    res,
    "Featured Product View",
  );
};


// Get Product Details
let getProductDetails = async (req, res) => {
  try {

    let productData = await productModel
      .findOne({
        _id: req.params.id,
        isDeleted: false,
        productStatus: true,
      })
      .populate("parentCategory", "categoryName")
      .populate("subCategory", "subCategoryName")
      .populate("subSubCategory", "subSubCategoryName")
      .populate("material", "materialName")
      .populate("color", "colorName")
      .populate(
        "upSellProducts",
        "productName productImage productPrice productActualPrice slug"
        )


    if (!productData) {
      return res.send({
        _status: false,
        _message: "Product Not Found",
        productData: null,
      });
    }


    res.send({
      _status: true,
      _message: "Product Details View",
      path: process.env.PRODUCTPATH,
      productData: productData,
    });

  } catch (error) {

    console.log(error);

    res.send({
      _status: false,
      _message: "Something Went Wrong",
      error: error.message,
    });

  }
};



// Get New Arrivals
let viewNewArrivalProduct = async (req, res) => {
  await getProductData(
    { productType: "newArrivals" },
    res,
    "New Arrivals Product View",
  );
};

// Get On Sale Products
let viewOnSaleProduct = async (req, res) => {
  await getProductData({ productType: "onSale" }, res, "On Sale Product View");
};

// Get Best Selling Products
let viewBestSellingProduct = async (req, res) => {
  await getProductData(
    { isBestSelling: true },
    res,
    "Best Selling Product View",
  );
};

// Get Top Rated Products
let viewTopRatedProduct = async (req, res) => {
  await getProductData({ isTopRate: true }, res, "Top Rated Product View");
};

module.exports = {
  viewProduct,
  viewFeaturedProduct,
  viewNewArrivalProduct,
  viewOnSaleProduct,
  viewBestSellingProduct,
  viewTopRatedProduct,
  getProductDetails,
};


