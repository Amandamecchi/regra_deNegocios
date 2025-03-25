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
        if (ingresso) {
           return res.status(404).json({ message: "ingresso não encontrado" });
        }
        res.json(500).json({ message: "Erro ao buscar ingresso" });
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
    const { evento, data_evento, local_evento, categoria, preco, quantidade_disponivel} = req.body;
    try {
        const updatedIngresso = await ingressoModel.updateIngresso(req.params.id, evento, data_evento, local_evento, categoria, preco, quantidade_disponivel);
        if (updatedIngresso) {
            res.status(200).json(updatedIngresso);
        } else {
            res.status(404).json({ message: "ingresso não encontrado" });
        }
    } catch (error) {
        console.error("Erro ao atualizar ingresso:", error); 
        res.status(500).json({ message: "erro ao atualizar ingresso" });
    }
};

const deleteIngresso = async (req, res) => {
    try {
        const deletedIngresso = await ingressoModel.deleteIngresso(req.params.id);
        if (deletedIngresso) {
            res.status(200).json({ message: "ingresso deletado com sucesso" });
        } else {
            res.status(404).json({ message: "ingresso não encontrado" });
        }
    } catch (error) {
        console.error("Erro ao deletar ingresso:", error); // Adiciona log de erro
        res.status(500).json({ message: "erro ao deletar ingresso" });
    }
};

const vendaIngresso = async (req, res) => {
    try {
        const { id, quantidade_disponivel } = req.body;
        const newVenda = await ingressoModel.vendaIngresso(id, quantidade_disponivel);
        if (newVenda) {
            res.status(400).json({message: newVenda.error});
        }
    } catch (error) {
        console.log(error); 
        if (error.code === '22P02') {
            return res.status(400).json({ message: "Quantidade inválida" });
        }
        res.status(500).json({ message: "Erro ao vender ingresso" });
    }
};

const insertIngressos = async () => {
    try {
        await ingressoModel.query(`
            INSERT INTO ingresso (evento, data_evento, local_evento, categoria, preco, quantidade_disponivel) 
            VALUES 
            ('Show de Jorge e Matheus', '2025-09-19', 'Allianz Parque', 'Pista', 500.00, 1000),
            ('Show de rock', '2025-05-20', 'Allianz Parque', 'Cadeira', 800.00, 500),
            ('Show da Anitta', '2025-06-10', 'Allianz Parque', 'Camarote', 1500.00, 200);
        `);
        console.log("Ingressos inseridos com sucesso");
    } catch (error) {
        console.error("Erro ao inserir ingressos:", error);
    }
};

module.exports = {
    getIngressos,
    getIngresso,
    createIngresso,
    updateIngresso,
    deleteIngresso,
    vendaIngresso,
    insertIngressos
};