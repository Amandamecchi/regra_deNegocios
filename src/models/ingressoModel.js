const pool = require('../config/database');

const getIngressos = async () => {
  const result = await pool.query('SELECT * FROM ingresso');
  return result.rows;
};


const getIngressoById = async (id) => {
  const result = await pool.query('SELECT * FROM ingresso WHERE id = $1', [id]);
  return result.rows[0];
};

const createIngresso = async (evento, data_evento, local_evento, categoria, preco, quantidade_disponivel) => {
  if (categoria === "meia" && preco < 50) {
    return { error: "Ingresso meia-entrada não pode ser menor que R$ 50,00" };
  } else if (categoria === "inteira" && preco < 100) {
    return { error: "Ingresso inteira não pode ser menor que R$ 100,00" };
  } else if (categoria === "vip" && preco < 200) {
    return { error: "Ingresso vip não pode ser menor que R$ 200,00" };
  } else if (categoria === "backstage" && preco < 500) {
    return { error: "Ingresso backstage não pode ser menor que R$ 500,00" };
  }

  const result = await pool.query(
    'INSERT INTO ingresso (evento, data_evento, local_evento, categoria, preco, quantidade_disponivel) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [evento, data_evento, local_evento, categoria, preco, quantidade_disponivel]
  );
  return result.rows[0];
};

const updateIngresso = async (id, evento, data_evento, local_evento, categoria, preco, quantidade_disponivel) => {
  const result = await pool.query(
    'UPDATE ingresso SET evento=$1, data_evento=$2, local_evento=$3, categoria=$4, preco=$5, quantidade_disponivel=$6 WHERE id=$7 RETURNING *',
    [evento, data_evento, local_evento, categoria, preco, quantidade_disponivel, id]
  );
  return result.rows[0];
};

const deleteIngresso = async (id) => {
  const result = await pool.query('DELETE FROM ingresso WHERE id = $1 RETURNING *', [id]);
  if (result.rowCount === 0) {
    return { message: "Ingresso não encontrado" };
  }
  return { message: "Ingresso deletado com sucesso" };
};

const vendaIngresso = async (id, quantidade_requerida) => {
  const ingresso = await pool.query('SELECT * FROM ingresso WHERE id = $1', [id]);

  if (ingresso.rows.length === 0) {
    return { error: "Ingresso não encontrado" };
  }

  let quantidade_disponivel = ingresso.rows[0].quantidade_disponivel;

  if (quantidade_disponivel < quantidade_requerida) {
    return { error: "Ingressos insuficientes" };
  }

  quantidade_disponivel -= quantidade_requerida;

  const result = await pool.query(
    'UPDATE ingresso SET quantidade_disponivel = $1 WHERE id = $2 RETURNING *',
    [quantidade_disponivel, id]
  );

  return {
    message: "Compra realizada com sucesso",
    quantidade_disponivel,
    quantidade_requerida,
    evento: ingresso.rows[0].evento
  };
};

module.exports = {
  getIngressos,
  getIngressoById,
  createIngresso,
  updateIngresso,
  deleteIngresso,
  vendaIngresso
};
