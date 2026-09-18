let express = require("express");


let subSubCategoryRoutes = express.Router();


const multer = require("multer");
const { createSubSubCategory, viewSubSubCategory, getParentCategory, getSubCategory, updateSubSubCategory, getDetails, deleteSubSubCategory, multiDeleteSubSubCategory, changeStatusSubSubCategory } = require("../../controller/admin/subSubCategoryController");


// const upload = multer({dest: "uploads/"}) //middleware


let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/subSubCategory");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({storage: storage});




subSubCategoryRoutes.post(
  "/create",
  upload.single("subSubCategoryImage"),
  createSubSubCategory,
);

subSubCategoryRoutes.get("/view", viewSubSubCategory);

subSubCategoryRoutes.get("/parent", getParentCategory);

subSubCategoryRoutes.get("/subCategory/:parentID", getSubCategory)


subSubCategoryRoutes.put(
  "/update/:id",
  upload.single("subSubCategoryImage"),
  updateSubSubCategory,
);

subSubCategoryRoutes.delete("/delete/:id", deleteSubSubCategory);

subSubCategoryRoutes.post("/multiDelete", multiDeleteSubSubCategory);

subSubCategoryRoutes.post("/changeStatus", changeStatusSubSubCategory);

subSubCategoryRoutes.get("/getDetails/:id", getDetails);

module.exports = { subSubCategoryRoutes };
