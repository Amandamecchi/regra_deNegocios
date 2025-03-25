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
        const { evento, data_evento, local_evento, categoria, preco, quantidade_disponivel } = req.body;
        const newIngresso = await ingressoModel.createIngresso(evento, data_evento, local_evento, categoria, preco, quantidade_disponivel);
        res.status(201).json(newIngresso);
    } catch (error) {
	 console.log(error);
        if (error.code === "23505") { 
            return res.status(400).json({ message: "Ingresso já cadastrado." });
        }
        res.status(500).json({ message: "Erro ao criar ingresso." });
    }
};

const updateIngresso = async (req, res) => {
    try {
        const { evento, data_evento, local_evento, categoria, preco, quantidade_disponivel} = req.body;
        const updatedIngresso = await ingressoModel.updateIngresso(req.params.id, evento, data_evento, local_evento, categoria, preco, quantidade_disponivel);
        if (!updatedIngresso) {
            return res.status(404).json({ message: "ingresso não encontrado" });
        } 
        res.json(updatedIngresso);
    } catch (error) {
        res.status(500).json({ message: "erro ao atualizar ingresso" });
    }
};

const deleteIngresso = async (req, res) => {
    try {
      const message = await ingressoModel.deleteIngresso(req.params.id);
      res.json({ message: message });
    } catch (error) {
        res.status(500).json({ message: "erro ao deletar ingresso" });
    }
};

const vendaIngresso = async (req, res) => {
    try {
        const { id, quantidade_requerida } = req.body;
        const newVenda = await ingressoModel.vendaIngresso(id, quantidade_requerida);
        if (newVenda.error) {
            return res.status(400).json({message: newVenda.error});
        }
        res.status(201).json(newVenda);
    } catch (error) {
        console.log(error); 
        if (error.code === '22P02') {
            return res.status(400).json({ message: "Quantidade inválida" });
        }
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