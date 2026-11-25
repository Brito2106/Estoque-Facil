
const express = require("express");
const cors = require("cors");
const path = require("path");
const { sequelize } = require("./database");
const produtosRoutes = require("./routes/produtosRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Controle da conexão com o banco
let databaseReady;

app.use("/api", async (req, res, next) => {
  try {
    if (!databaseReady) {
      databaseReady = (async () => {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log("Banco de dados conectado com sucesso.");
      })();
    }

    await databaseReady;
    next();

  } catch (erro) {
    console.error("Erro ao conectar com o banco:", erro);

    databaseReady = null;

    res.status(500).json({
      erro: "Não foi possível conectar ao banco de dados."
    });
  }
});

// Rotas dos produtos
app.use("/api/produtos", produtosRoutes);

// Rota principal da API
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

// Arquivos estáticos
const publicPath = path.join(__dirname, "..", "public");

app.use(express.static(publicPath));

app.get("/", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

module.exports = app;
