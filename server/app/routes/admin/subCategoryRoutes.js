let express = require("express");


let subCategoryRoutes = express.Router();


const multer = require("multer");
const { createSubCategory, viewSubCategory, getParentCategory, updateSubCategory, getDetails, deleteSubCategory, multiDeleteSubCategory, changeStatusSubCategory } = require("../../controller/admin/subCategoryController");

// const upload = multer({dest: "uploads/"}) //middleware


let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/subCategory");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({storage: storage});




subCategoryRoutes.post(
  "/create",
  upload.single("subCategoryImage"),
  createSubCategory,
);

subCategoryRoutes.get("/view", viewSubCategory);

subCategoryRoutes.get("/parent", getParentCategory);


subCategoryRoutes.put(
  "/update/:id",
  upload.single("subCategoryImage"),
  updateSubCategory,
);

subCategoryRoutes.delete("/delete/:id", deleteSubCategory);

subCategoryRoutes.post("/multiDelete", multiDeleteSubCategory);

subCategoryRoutes.post("/changeStatus", changeStatusSubCategory);

subCategoryRoutes.get("/getDetails/:id", getDetails);

module.exports = { subCategoryRoutes };
