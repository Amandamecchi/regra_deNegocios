const express = require("express");
const router = express.Router();
const pdfController = require("../controllers/reportController");

router.get("/ingressos/pdf", pdfController.gerarRelatorioPDF);

module.exports = router;
