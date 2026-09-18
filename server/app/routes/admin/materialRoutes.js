let express = require("express")

const { createMaterial, viewMaterial, updateMaterial, deleteMaterial, multiDeleteMaterial, changeStatusMaterial, getDetails } = require("../../controller/admin/materialController")



let materialRoutes = express.Router()


materialRoutes.post("/create", createMaterial)

materialRoutes.get("/view",viewMaterial)

materialRoutes.put("/update/:id",updateMaterial)

materialRoutes.delete("/delete/:id",deleteMaterial)

materialRoutes.post("/multiDelete",multiDeleteMaterial)

materialRoutes.post("/changeStatus", changeStatusMaterial);

materialRoutes.get("/getDetails/:id", getDetails);


module.exports = { materialRoutes };

