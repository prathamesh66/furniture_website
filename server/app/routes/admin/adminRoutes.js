let express = require("express");
const { colorRoutes } = require("./colorRoutes");
const { materialRoutes } = require("./materialRoutes");
const { countryRoutes } = require("./countryRoutes");
const { faqRoutes } = require("./faqRoutes");
const { categoryRoutes } = require("./categoryRoutes");
const { subCategoryRoutes } = require("./subCategoryRoutes");
const { subSubCategoryRoutes } = require("./subSubCategoryRoutes");
const { productRoutes } = require("./productRoutes");
const { whyChooseUsRoutes } = require("./whyChooseUsRoutes");
const { sliderRoutes } = require("./sliderRoutes");

let adminRoutes = express.Router();

// in this also we not create the api  

// URL http://localhost:8000/admin/color/create

// adminRoutes.post("/color/create",(req,res)=> {
//   res.send({
//     _status: true,
//     _message: "Color Added",
//   });
// })


// in this we create the api and call in this the function

adminRoutes.use("/color",colorRoutes)
adminRoutes.use("/material", materialRoutes);
adminRoutes.use("/country",countryRoutes)
adminRoutes.use("/faq",faqRoutes)
adminRoutes.use("/category",categoryRoutes)
adminRoutes.use("/subCategory", subCategoryRoutes);
adminRoutes.use("/subSubCategory",subSubCategoryRoutes)
adminRoutes.use("/product", productRoutes);
adminRoutes.use("/whychooseus", whyChooseUsRoutes);
adminRoutes.use("/slider", sliderRoutes);




module.exports={adminRoutes}