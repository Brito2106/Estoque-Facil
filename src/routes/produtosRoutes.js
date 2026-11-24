const express = require("express");
const Produto = require("../models/Produto");

const router = express.Router();

// READ - listar todos
router.get("/", async (req, res) => {
  try {
    const produtos = await Produto.findAll({
      order: [["id", "DESC"]]
    });
    res.json(produtos);
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao buscar produtos." });
  }
});

// READ - buscar por ID
router.get("/:id", async (req, res) => {
  try {
    const produto = await Produto.findByPk(req.params.id);

    if (!produto) {
      return res.status(404).json({ erro: "Produto não encontrado." });
    }

    res.json(produto);
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao buscar produto." });
  }
});

// CREATE - cadastrar
router.post("/", async (req, res) => {
  try {
    const { nome, categoria, preco, estoque } = req.body;

    const produto = await Produto.create({
      nome,
      categoria,
      preco: Number(preco),
      estoque: Number(estoque)
    });

    res.status(201).json(produto);
  } catch (erro) {
    res.status(400).json({
      erro: erro.errors?.[0]?.message || "Erro ao cadastrar produto."
    });
  }
});

// UPDATE - atualizar
router.put("/:id", async (req, res) => {
  try {
    const produto = await Produto.findByPk(req.params.id);

    if (!produto) {
      return res.status(404).json({ erro: "Produto não encontrado." });
    }

    const { nome, categoria, preco, estoque } = req.body;

    await produto.update({
      nome,
      categoria,
      preco: Number(preco),
      estoque: Number(estoque)
    });

    res.json(produto);
  } catch (erro) {
    res.status(400).json({
      erro: erro.errors?.[0]?.message || "Erro ao atualizar produto."
    });
  }
});

// DELETE - remover
router.delete("/:id", async (req, res) => {
  try {
    const produto = await Produto.findByPk(req.params.id);

    if (!produto) {
      return res.status(404).json({ erro: "Produto não encontrado." });
    }

    await produto.destroy();

    res.json({ mensagem: "Produto removido com sucesso." });
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao remover produto." });
  }
});

module.exports = router;