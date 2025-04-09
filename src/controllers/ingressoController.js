const ingressoModel = require('../models/ingressoModel');

const getIngressos = async (req, res) => {
  try {
    const ingressos = await ingressoModel.getIngressos();
    res.json(ingressos);
  } catch (error) {
    console.error("Erro ao buscar ingressos:", error); // <-- ajuda a debugar
    res.status(500).json({ message: "Erro ao buscar ingressos" });
  }
};


const getIngresso = async (req, res) => {
  try {
    const ingresso = await ingressoModel.getIngressoById(req.params.id);
    if (!ingresso) {
      return res.status(404).json({ message: "Ingresso não encontrado" });
    }
    res.json(ingresso);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar ingresso" });
  }
};

const createIngresso = async (req, res) => {
try {
  const { evento, data_evento, local_evento, categoria, preco, quantidade_disponivel} = req.body;
  const newIngresso = await ingressoModel.createIngresso(evento, data_evento, local_evento, categoria, preco, quantidade_disponivel);
  if (!newIngresso.error) {
    return res.status(400).json({ message: newIngresso.error });
  }
  res.status(201).json(newIngresso);
} catch (error) {
  console.error(error);
  res.status(500).json({ message: "Erro ao criar ingresso" });
}
};

const updateIngresso = async (req, res) => {
try {
  const { evento, data_evento, local_evento, categoria, preco, quantidade_disponivel } = req.body;
  const update = await ingressoModel.updateIngresso(req.params.id, evento, data_evento, local_evento, categoria, preco, quantidade_disponivel);
  if (!update) {
    return res.status(400).json({ message: "Erro ao atualizar" });
  }
  res.json(update); 
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
    const { id, quantidade_requerida } = req.body;
    const venda = await ingressoModel.vendaIngresso(id, quantidade_requerida);
    if (venda.error) {
      return res.status(400).json({ message: venda.error });
    }
    res.status(201).json(venda);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao vender ingresso" });
  }
};



module.exports = {
  getIngressos,
  getIngresso,
  createIngresso,
  updateIngresso,
  deleteIngresso,
  vendaIngresso
};
