
// ==========================================
// ADD TO WISHLIST
// ==========================================

const { wishlistModel } = require("../../model/wishlistModel");

let addWishlist = async (request, response) => {
  try {
    let userID = request.userID;
    let productID = request.body.productId;

    // Check Product ID
    if (!productID) {
      return response.send({
        _status: false,
        _message: "Product ID is required",
      });
    }

    // Check if product is already in wishlist
    let alreadyWishlist = await wishlistModel.findOne({
      userId: userID,
      productId: productID,
    });

    if (alreadyWishlist) {
      return response.send({
        _status: false,
        _message: "Product already exists in wishlist",
      });
    }

    // Save wishlist
    let wishlistData = new wishlistModel({
      userId: userID,
      productId: productID,
    });

    let result = await wishlistData.save();

    response.send({
      _status: true,
      _message: "Product added to wishlist",
      _data: result,
    });
  } catch (error) {
    console.log("ADD WISHLIST ERROR:", error);

    response.send({
      _status: false,
      _message: "Something went wrong",
      errors: [
        {
          error: error.message,
        },
      ],
    });
  }
};

// ==========================================
// VIEW MY WISHLIST
// ==========================================

let viewWishlist = async (request, response) => {
  try {
    let userID = request.userID;

    let wishlistData = await wishlistModel
      .find({
        userId: userID,
      })
      .populate({
        path: "productId",
        match: {
          isDeleted: false,
          productStatus: true,
        },
        populate: [
          {
            path: "parentCategory",
            select: "categoryName",
          },
          {
            path: "subCategory",
            select: "subCategoryName",
          },
          {
            path: "material",
            select: "materialName",
          },
          {
            path: "color",
            select: "colorName",
          },
        ],
      })
      .sort({
        createdAt: -1,
      });

    // Remove wishlist records whose product no longer exists
    wishlistData = wishlistData.filter((item) => item.productId);

    response.send({
      _status: true,
      _message: "My Wishlist",
      path: process.env.PRODUCTPATH,
      _wishlistData: wishlistData,
    });
  } catch (error) {
    console.log("VIEW WISHLIST ERROR:", error);

    response.send({
      _status: false,
      _message: "Something went wrong",
      errors: [
        {
          error: error.message,
        },
      ],
    });
  }
};

// ==========================================
// REMOVE FROM WISHLIST
// ==========================================

let removeWishlist = async (request, response) => {
  try {
    let userID = request.userID;
    let productID = request.params.productId;

    let result = await wishlistModel.deleteOne({
      userId: userID,
      productId: productID,
    });

    if (result.deletedCount === 0) {
      return response.send({
        _status: false,
        _message: "Wishlist product not found",
      });
    }

    response.send({
      _status: true,
      _message: "Product removed from wishlist",
    });
  } catch (error) {
    console.log("REMOVE WISHLIST ERROR:", error);

    response.send({
      _status: false,
      _message: "Something went wrong",
      errors: [
        {
          error: error.message,
        },
      ],
    });
  }
};

// ==========================================
// EXPORT
// ==========================================

module.exports = {
  addWishlist,
  viewWishlist,
  removeWishlist,
};
