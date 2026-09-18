let express = require("express");


let productRoutes = express.Router();


const multer = require("multer");
const { createProduct, viewProduct, getParentCategory, getSubCategory, updateProduct, deleteProduct, multiDeleteProduct, changeStatusProduct, getDetails, getSubSubCategory, getColors, getMaterial } = require("../../controller/admin/productController");



// const upload = multer({dest: "uploads/"}) //middleware


let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/product");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({storage: storage});




productRoutes.post(
  "/create",
  upload.fields([
    {
      name: "productImage",
      maxCount: 1,
    },

    {
      name: "productGallery",
      maxCount: 10,
    },
  ]),
  createProduct,
);

productRoutes.get("/view", viewProduct);

productRoutes.get("/parent", getParentCategory);

productRoutes.get("/subCategory/:parentID", getSubCategory);

productRoutes.get("/subSubCategory/:parentID", getSubSubCategory);

productRoutes.get("/color", getColors);

productRoutes.get("/material", getMaterial);


productRoutes.put(
  "/update/:id",
  upload.fields([
    {
      name: "productImage",
      maxCount: 1,
    },

    {
      name: "productGallery",
      maxCount: 10,
    },
  ]),
  updateProduct,
);

productRoutes.delete("/delete/:id", deleteProduct);

productRoutes.post("/multiDelete", multiDeleteProduct);

productRoutes.post("/changeStatus", changeStatusProduct);

productRoutes.get("/getDetails/:id", getDetails);

module.exports = { productRoutes };
