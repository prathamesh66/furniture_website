let express = require("express");


let sliderRoutes = express.Router();


const multer = require("multer");

const { createSlider, viewSlider, updateSlider, deleteSlider, multiDeleteSlider, changeStatusSlider, getDetails } = require("../../controller/admin/sliderController");

// const upload = multer({dest: "uploads/"}) //middleware ,  this is the half control


// thhis is the full control to store the files to disk 

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/slider");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({storage: storage});




sliderRoutes.post("/create", upload.single("sliderImage"), createSlider);

sliderRoutes.get("/view", viewSlider);

sliderRoutes.put("/update/:id", upload.single("sliderImage"), updateSlider);

sliderRoutes.delete("/delete/:id", deleteSlider);

sliderRoutes.post("/multiDelete", multiDeleteSlider);

sliderRoutes.post("/changeStatus", changeStatusSlider);

sliderRoutes.get("/getDetails/:id", getDetails);

module.exports = { sliderRoutes };
