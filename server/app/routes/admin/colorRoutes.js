let express = require("express");
const { createColor, viewColor, deleteColor, updateColor, multiDeleteColor, changeStatusColor, getDetails } = require("../../controller/admin/colorController");

// const { colorController } = require("../../controller/admin/colorController");

let colorRoutes = express.Router()

// this is the method in this we define the function also here 

//  // localhost:8000/admin/color/create
//  http: colorRoutes.post("/create", (req, res) => {
//    res.send({
//      _status: true,
//      _message: "Color Added",
//    });
//  });


// // http://localhost:8000/admin/color/view
// colorRoutes.get("/view", (req, res) => {
//   res.send({
//     _status: true,
//     _message: "Color View",
//   });
// });


// // localhost:8000/admin/color/delete/1
// colorRoutes.delete("/delete/:id", (req, res) => {
//   res.send({
//     _status: true,
//     _message: "Color Delete",
//   });
// });


// //  localhost:8000/admin/color/update/1
// colorRoutes.put("/update/:id", (req, res) => {
//   res.send({
//     _status: true,
//     _message: "Color Updated",
//   });
// });




// now the use of the Controllers method 1

//  // localhost:8000/admin/color/create
colorRoutes.post("/create", createColor);


// // http://localhost:8000/admin/color/view
colorRoutes.post("/view", viewColor);


// // localhost:8000/admin/color/delete/1
colorRoutes.delete("/delete/:id", deleteColor);

// // localhost:8000/admin/color/delete/1
colorRoutes.post("/multiDelete", multiDeleteColor);

colorRoutes.post("/changeStatus", changeStatusColor);


colorRoutes.get("/getDetails/:id", getDetails);



// //  localhost:8000/admin/color/update/1
colorRoutes.put("/update/:id", updateColor);


module.exports = { colorRoutes };




// now this is the only one function create and use  method 2

//  // localhost:8000/admin/color/create
// colorRoutes.post("/create", colorController.createColor);


// // http://localhost:8000/admin/color/view
// colorRoutes.get("/view", colorController.viewColor);


// // localhost:8000/admin/color/delete/1
// colorRoutes.delete("/delete/:id", colorController.deleteColor);


// //  localhost:8000/admin/color/update/1
// colorRoutes.put("/update/:id", colorController.updateColor);


// module.exports = { colorRoutes };
