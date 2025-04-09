require("dotenv").config();
const express = require("express");
const cors = require("cors");

const ingressoRoutes = require("./src/routes/ingressoRoutes");
const reportRoutes = require("./src/routes/reportRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API de Ingressos está rodando 🚀");
});

app.use("/api", ingressoRoutes);
app.use("/api", reportRoutes);  // Nova rota adicionada aqui

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
