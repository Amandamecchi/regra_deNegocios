const express = require("express");
const router = express.Router();
const pdfController = require("../controllers/reportController");

// Rota para geração do PDF com todos os ingressos
router.get("/ingressos/pdf", pdfController.gerarRelatorioPDF);

module.exports = router;
