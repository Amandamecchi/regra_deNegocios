const express = require("express");
const router = express.Router();
const ingressoController = require("../controllers/ingressoController");

router.get("/ingressos", ingressoController.getIngressos);
router.get("/ingressos/:id", ingressoController.getIngresso);
router.put("/ingressos/:id", ingressoController.updateIngresso);
router.post("/ingressos", ingressoController.createIngresso);
router.delete("/ingressos/:id", ingressoController.deleteIngresso);
router.post("/venda", ingressoController.vendaIngresso);

module.exports = router;
