const { DataTypes } = require("sequelize");
const { sequelize } = require("../database");

const Produto = sequelize.define("Produto", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "O nome é obrigatório."
      }
    }
  },
  categoria: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "A categoria é obrigatória."
      }
    }
  },
  preco: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: {
        args: [0],
        msg: "O preço não pode ser negativo."
      }
    }
  },
  estoque: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: {
        args: [0],
        msg: "O estoque não pode ser negativo."
      }
    }
  }
});

module.exports = Produto;