const pool = require('../config/database');

const getIngressos = async () => {
    try {
        const ingressos = await ingressoModel.getIngressos();
        res.json(ingressos);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar ingresso linha 3 a 11" });
    }
};

const getIngresso = async (req, res) => {
    try {
        const ingresso = await ingressoModel.getIngresso(req.params.id);
        if (!ingresso) {
            return res.status(404).json({ message: "ingresso não encontrado" });
        }
        res.json(ingresso);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar ingresso linha 13 a 21" });
    }
};

const createIngresso = async (req, res) => {
    try {
        const { evento, data_evento, local_evento, categoria, preco, quantidade_disponivel } = req.body;
        const newIngresso = await ingressoModel.createIngresso(evento, data_evento, local_evento, categoria, preco, quantidade_disponivel);
        res.status(201).json(newIngresso);
    } catch (error) {
        console.log(error);
        if (error.code === "22P02") {
            return res.status(400).json({ message: "preço ou quantidade disponível inválidos linha 25 a 32" });
        }
        res.status(500).json({ message: "Erro ao criar ingresso linha 25 a 32" });
    }
};

const updateIngresso = async (evento, data_evento, local_evento, categoria, preco, quantidade_disponivel, id) => {
    const result = await pool.query(
        'UPDATE ingresso SET evento = $1, data_evento = $2, local_evento = $3, categoria = $4, preco = $5, quantidade_disponivel = $6 WHERE id = $7 RETURNING *',
        [evento, data_evento, local_evento, categoria, preco, quantidade_disponivel, id]
    );
    return result.rows[0];
};

const deleteIngresso = async (id) => {
    const result = await pool.query('DELETE FROM ingresso WHERE id = $1 RETURNING *', [id]);
    if (result.rowCount === 0) {
        return { message: "ingresso não encontrado" };
    }
    return { message: "ingresso deletado com sucesso" };
};

const vendaIngresso = async (id, quantidade_requerida, evento) => {
    const ingresso = await pool.query('SELECT * FROM ingresso WHERE id = $1', [id]);
    let quantidade_disponivel = ingresso.rows[0].quantidade_disponivel;

    if (quantidade_disponivel < quantidade_requerida) {
        return { error: "Ingressos insuficientes" };
    }
    quantidade_disponivel -= quantidade_requerida;
    const result = await pool.query('UPDATE ingresso SET quantidade_disponivel = $1 WHERE id = $2 RETURNING *', [quantidade_disponivel, id]);
    return { message: "compra realizada com sucesso", quantidade_disponivel, quantidade_requerida, evento };
};

module.exports = {
    getIngressos,
    getIngresso,
    createIngresso,
    updateIngresso,
    deleteIngresso,
    vendaIngresso
};