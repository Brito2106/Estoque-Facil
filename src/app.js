const express = require("express");
const cors = require("cors");
const path = require("path");
const produtosRoutes = require("./routes/produtosRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Rotas da API
app.use("/api/produtos", produtosRoutes);

app.get("/api", (req, res) => {
  res.json({
    mensagem: "API de Produtos funcionando!",
    rotas: {
      listar: "GET /api/produtos",
      buscar: "GET /api/produtos/:id",
      cadastrar: "POST /api/produtos",
      atualizar: "PUT /api/produtos/:id",
      remover: "DELETE /api/produtos/:id"
    }
  });
});

// Arquivos do site (HTML, CSS e JavaScript)
const publicPath = path.join(__dirname, "..", "frontend");
app.use(express.static(publicPath));
app.get("/", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

module.exports = app;
