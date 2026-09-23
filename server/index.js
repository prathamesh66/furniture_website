let express = require("express")
const { adminRoutes } = require("./app/routes/admin/adminRoutes")

const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const path = require("path");

require("dotenv").config()
const cors = require("cors");
let app = express()

app.use(express.json())
app.use(cors());

app.use(express.urlencoded({ extended: true }));

const mongoose = require("mongoose");
const { websiteRoutes } = require("./app/routes/website/websiteRoutes");

app.use("/admin",adminRoutes);  // this is used the adminRoutes in this URL http://localhost:8000/admin

app.use("/website",websiteRoutes);  // this is used the websiteRoutes in this URL http://localhost:8000/website

app.use("/uploads/category", express.static("uploads/category"));

app.use("/uploads/subCategory", express.static("uploads/subCategory"));

app.use("/uploads/subSubCategory", express.static("uploads/subSubCategory"));

app.use("/uploads/product", express.static("uploads/product"));

app.use("/uploads/whychooseus", express.static("uploads/whychooseus"));

app.use("/uploads/slider", express.static("uploads/slider"));

app.use("/uploads/admin", express.static("uploads/admin"));




// app.listen(process.env.PORT || 8000,()=> {
//     mongoose
//        .connect("mongodb://127.0.0.1:27017/onlineShop")
//       .then(() => console.log("Connected!"));
//     console.log("Server Start",process.env.PORT)
// })

console.log("RAZORPAY KEY EXISTS:", !!process.env.RAZORPAY_KEY_ID);
console.log("RAZORPAY SECRET EXISTS:", !!process.env.RAZORPAY_KEY_SECRET);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected!");

    app.listen(process.env.PORT || 8000, () => {
      console.log("Server Start", process.env.PORT || 8000);
    });
  })
  .catch((error) => {
    console.log("MongoDB Connection Error:", error.message);
  });
