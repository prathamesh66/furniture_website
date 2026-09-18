let express = require("express");
const { createCountry, viewCountry, updateCountry, deleteCountry, multiDeleteCountry, changeStatusCountry, getDetails } = require("../../controller/admin/countryController");

let countryRoutes = express.Router();



countryRoutes.post("/create", createCountry);

countryRoutes.get("/view", viewCountry);

countryRoutes.put("/update/:id", updateCountry);

countryRoutes.delete("/delete/:id", deleteCountry);

countryRoutes.post("/multiDelete", multiDeleteCountry);

countryRoutes.post("/changeStatus", changeStatusCountry);

countryRoutes.get("/getDetails/:id", getDetails);

module.exports = { countryRoutes };