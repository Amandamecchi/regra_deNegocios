const express = require('express');
const router = express.Router();
const ingressoController = require('../controllers/ingressoController');

router.get('/ingresso', ingressoController.getIngressos);
router.get('/ingresso/:id', ingressoController.getIngresso);
router.post('/ingresso', ingressoController.createIngresso);
router.put('/ingresso/:id', ingressoController.updateIngresso);
router.delete('/ingresso/:id', ingressoController.deleteIngresso);
router.post('/ingresso/:id/venda', ingressoController.vendaIngresso);

module.exports = router;
