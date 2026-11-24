const app = require("./src/app");
const { sequelize } = require("./src/database");

const PORT = process.env.PORT || 3000;

async function iniciarServidor() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Banco de dados conectado com Sequelize.");

    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (erro) {
    console.error("Erro ao iniciar a aplicação:", erro);
    process.exit(1);
  }
}

iniciarServidor();
