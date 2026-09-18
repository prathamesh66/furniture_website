let express = require("express");
const { createCategory, viewCategory, updateCategory, getDetails, deleteCategory, multiDeleteCategory, changeStatusCategory } = require("../../controller/admin/categoryController");

let categoryRoutes = express.Router();


const multer = require("multer")

// const upload = multer({dest: "uploads/"}) //middleware ,  this is the half control


// thhis is the full control to store the files to disk 

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/users");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({storage: storage});




categoryRoutes.post("/create", upload.single("categoryImage"), createCategory);

categoryRoutes.get("/view", viewCategory);

categoryRoutes.put("/update/:id",upload.single("categoryImage"), updateCategory);

categoryRoutes.delete("/delete/:id", deleteCategory);

categoryRoutes.post("/multiDelete", multiDeleteCategory);

categoryRoutes.post("/changeStatus", changeStatusCategory);

categoryRoutes.get("/getDetails/:id", getDetails);

module.exports = { categoryRoutes };
