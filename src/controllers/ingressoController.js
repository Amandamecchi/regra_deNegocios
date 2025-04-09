const ingressoModel = require('../models/ingressoModel');

const getIngressos = async (req, res) => {
    try {
        const ingressos = await ingressoModel.getIngressos();
        res.json(ingressos);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar ingresso" });
    }
};

const getIngresso = async (req, res) => {
    try {
        const ingresso = await ingressoModel.getIngressoById(req.params.id);
        if (!ingresso) {
           return res.status(404).json({ message: "ingresso não encontrado" });
        }
        res.json(ingresso);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar ingresso" });
    }
};

const createIngresso = async (req, res) => {
    try {
        const ingresso = await ingressoModel.createIngresso(req.body);
        if (ingresso.error) return res.status(400).json({ message: ingresso.error });
        res.status(201).json(ingresso);
    } catch (error) {
        res.status(500).json({ message: "Erro ao criar ingresso" });
    }
};

const updateIngresso = async (req, res) => {
    try {
        const ingresso = await ingressoModel.updateIngresso(req.params.id, req.body);
        if (!ingresso) return res.status(404).json({ message: "Ingresso não encontrado" });
        res.json(ingresso);
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar ingresso" });
    }
};

const deleteIngresso = async (req, res) => {
    try {
      const message = await ingressoModel.deleteIngresso(req.params.id);
      res.json({ message });
    } catch (error) {
        res.status(500).json({ message: "erro ao deletar ingresso" });
    }
};

const vendaIngresso = async (req, res) => {
    try {
        const result = await ingressoModel.vendaIngresso(req.body.id, req.body.quantidade_requerida);
        if (result.error) return res.status(400).json({ message: result.error });
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: "Erro ao vender ingresso" });
    }
};





module.exports = {
    getIngressos,
    getIngresso,
    createIngresso,
    updateIngresso,
    deleteIngresso,
    vendaIngresso,
};