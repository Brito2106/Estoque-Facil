require("pg");

const { Sequelize } = require("sequelize");
const path = require("path");

// Local development keeps using SQLite. On Vercel, DATABASE_URL switches to PostgreSQL.
let sequelize;

if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    pool: {
      max: 2,
      min: 0,
      acquire: 10000,
      idle: 10000
    }
  });
} else {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: path.join(__dirname, "..", "data", "database.sqlite"),
    logging: false
  });
}

module.exports = { sequelize };
