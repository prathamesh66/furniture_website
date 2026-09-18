let express = require("express");
const { createFaq, viewFaq, updateFaq, deleteFaq, multiDeleteFaq, changeStatusFaq, getDetails } = require("../../controller/admin/faqController");


let faqRoutes = express.Router();

faqRoutes.post("/create", createFaq);

faqRoutes.get("/view", viewFaq);

faqRoutes.put("/update/:id", updateFaq);

faqRoutes.delete("/delete/:id", deleteFaq);

faqRoutes.post("/multiDelete", multiDeleteFaq);

faqRoutes.post("/changeStatus", changeStatusFaq);

faqRoutes.get("/getDetails/:id", getDetails);

module.exports = { faqRoutes };
