let express = require('express');
const { register, login, changePassword, forgotPassword, resetPassword, updateProfile, viewProfile } = require('../../controller/website/authUserController');
const { checkToken } = require('../../middleware/checkToken');

let authUserRoutes = express.Router()

const multer = require("multer")


let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/category");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({storage: storage});




authUserRoutes.post("/create", register);

authUserRoutes.post("/forgotPassword", forgotPassword);

authUserRoutes.put("/resetPassword/:id", resetPassword);


authUserRoutes.post("/login", login);

authUserRoutes.post("/viewProfile",upload.none() ,checkToken, viewProfile);


authUserRoutes.post(
  "/updateProfile",
  upload.single("image"),
  checkToken,
  updateProfile,
);

authUserRoutes.post("/changePassword", checkToken, changePassword);

module.exports = { authUserRoutes };