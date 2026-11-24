const app = require("../src/app");
const { sequelize } = require("../src/database");

let databaseReady;

module.exports = async (req, res) => {
  try {
    if (!databaseReady) {
      databaseReady = (async () => {
        await sequelize.authenticate();
        await sequelize.sync();
      })();
    }

    await databaseReady;
    return app(req, res);
  } catch (error) {
    console.error("Erro na API:", error);
    databaseReady = null;
    return res.status(500).json({ erro: "Não foi possível conectar ao banco de dados." });
  }
};
