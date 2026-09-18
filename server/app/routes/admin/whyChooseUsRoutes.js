let express = require("express");

let whyChooseUsRoutes = express.Router();

const multer = require("multer");

const { getDetails, changeStatusWhyChooseUs, multiDeleteWhyChooseUs, deleteWhyChooseUs, updateWhyChooseUs, viewWhyChooseUs, createWhyChooseUs } = require("../../controller/admin/whyChooseUsController");

// const upload = multer({dest: "uploads/"}) //middleware ,  this is the half control


// thhis is the full control to store the files to disk 

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/whychooseus");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({storage: storage});


whyChooseUsRoutes.post(
  "/create",
  upload.single("whyChooseUsImage"),
  createWhyChooseUs,
);

whyChooseUsRoutes.get("/view", viewWhyChooseUs);

whyChooseUsRoutes.put(
  "/update/:id",
  upload.single("whyChooseUsImage"),
  updateWhyChooseUs,
);

whyChooseUsRoutes.delete("/delete/:id", deleteWhyChooseUs);

whyChooseUsRoutes.post("/multiDelete", multiDeleteWhyChooseUs);

whyChooseUsRoutes.post("/changeStatus", changeStatusWhyChooseUs);

whyChooseUsRoutes.get("/getDetails/:id", getDetails);

module.exports = { whyChooseUsRoutes };
