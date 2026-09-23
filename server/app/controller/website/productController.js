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


let productListing = async (req, res) => {
  try {
    let { subCategory, material, color, minPrice, maxPrice, sort, search } =
      req.query;

    let filter = {
      isDeleted: false,
      productStatus: true,
    };

    // ==========================================
    // SEARCH PRODUCT
    // ==========================================

    if (search) {
      filter.productName = {
        $regex: search,
        $options: "i",
      };
    }

    // ==========================================
    // SUB CATEGORY
    // ==========================================

    if (subCategory) {
      let subCategoryArray = subCategory.split(",");

      filter.subCategory = {
        $in: subCategoryArray,
      };
    }

    // ==========================================
    // MATERIAL
    // ==========================================

    if (material) {
      let materialArray = material.split(",");

      filter.material = {
        $in: materialArray,
      };
    }

    // ==========================================
    // COLOR
    // ==========================================

    if (color) {
      let colorArray = color.split(",");

      filter.color = {
        $in: colorArray,
      };
    }

    // ==========================================
    // PRICE
    // ==========================================

    if (minPrice || maxPrice) {
      filter.productPrice = {};

      if (minPrice) {
        filter.productPrice.$gte = Number(minPrice);
      }

      if (maxPrice) {
        filter.productPrice.$lte = Number(maxPrice);
      }
    }

    // ==========================================
    // SORT
    // ==========================================

    let sortQuery = {
      productOrder: 1,
    };

    if (sort === "priceLow") {
      sortQuery = {
        productPrice: 1,
      };
    }

    if (sort === "priceHigh") {
      sortQuery = {
        productPrice: -1,
      };
    }

    if (sort === "nameAZ") {
      sortQuery = {
        productName: 1,
      };
    }

    if (sort === "nameZA") {
      sortQuery = {
        productName: -1,
      };
    }

    if (sort === "newest") {
      sortQuery = {
        createdAt: -1,
      };
    }

    // ==========================================
    // FEATURED
    // ==========================================

    if (sort === "featured") {
      filter.productType = "featured";

      sortQuery = {
        productOrder: 1,
      };
    }

    // ==========================================
    // ON SALE
    // ==========================================

    if (sort === "onSale") {
      filter.productType = "onSale";

      sortQuery = {
        productOrder: 1,
      };
    }

    // ==========================================
    // BEST SELLING
    // ==========================================

    if (sort === "bestSelling") {
      filter.isBestSelling = true;

      sortQuery = {
        productOrder: 1,
      };
    }

    // ==========================================
    // CONSOLE
    // ==========================================

    console.log("PRODUCT SEARCH:", search);
    console.log("PRODUCT FILTER:", filter);
    console.log("PRODUCT SORT:", sortQuery);

    // ==========================================
    // GET PRODUCTS
    // ==========================================

    let productData = await productModel
      .find(filter)
      .populate("parentCategory", "categoryName")
      .populate("subCategory", "subCategoryName")
      .populate("subSubCategory", "subSubCategoryName")
      .populate("material", "materialName")
      .populate("color", "colorName")
      .sort(sortQuery);

    // ==========================================
    // RESPONSE
    // ==========================================

    res.send({
      _status: true,
      _message: "Product Listing",
      path: process.env.PRODUCTPATH,
      _productData: productData,
    });
  } catch (error) {
    console.log("PRODUCT LISTING ERROR:", error);

    res.send({
      _status: false,
      _message: "Something went wrong",
      _error: error.message,
    });
  }
};

module.exports = {
  viewProduct,
  viewFeaturedProduct,
  viewNewArrivalProduct,
  viewOnSaleProduct,
  viewBestSellingProduct,
  viewTopRatedProduct,
  getProductDetails,
  productListing,
};


