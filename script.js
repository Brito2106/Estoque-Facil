const API = "/api/produtos";

const form = document.getElementById("produto-form");
const produtoId = document.getElementById("produto-id");
const nome = document.getElementById("nome");
const categoria = document.getElementById("categoria");
const preco = document.getElementById("preco");
const estoque = document.getElementById("estoque");
const lista = document.getElementById("lista-produtos");
const mensagem = document.getElementById("mensagem");
const tituloForm = document.getElementById("titulo-form");
const btnSalvar = document.getElementById("btn-salvar");
const btnCancelar = document.getElementById("btn-cancelar");
const contador = document.getElementById("contador");

async function carregarProdutos() {
  try {
    const resposta = await fetch(API);
    const produtos = await resposta.json();

    lista.innerHTML = "";
    contador.textContent = `${produtos.length} produto${produtos.length === 1 ? "" : "s"}`;

    if (produtos.length === 0) {
      lista.innerHTML = `
        <tr>
          <td colspan="6" class="vazio">Nenhum produto cadastrado.</td>
        </tr>
      `;
      return;
    }

    produtos.forEach(produto => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${produto.id}</td>
        <td>${escaparHTML(produto.nome)}</td>
        <td>${escaparHTML(produto.categoria)}</td>
        <td>R$ ${Number(produto.preco).toFixed(2).replace(".", ",")}</td>
        <td>${produto.estoque}</td>
        <td>
          <button class="acao-editar" onclick="editarProduto(${produto.id})">Editar</button>
          <button class="acao-excluir" onclick="excluirProduto(${produto.id})">Excluir</button>
        </td>
      `;

      lista.appendChild(tr);
    });
  } catch (erro) {
    mostrarMensagem("Não foi possível carregar os produtos.", true);
  }
}

form.addEventListener("submit", async (evento) => {
  evento.preventDefault();

  const dados = {
    nome: nome.value.trim(),
    categoria: categoria.value.trim(),
    preco: Number(preco.value),
    estoque: Number(estoque.value)
  };

  const id = produtoId.value;
  const metodo = id ? "PUT" : "POST";
  const url = id ? `${API}/${id}` : API;

  try {
    const resposta = await fetch(url, {
      method: metodo,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dados)
    });

    const resultado = await resposta.json();

    if (!resposta.ok) {
      throw new Error(resultado.erro || "Erro na operação.");
    }

    mostrarMensagem(id ? "Produto atualizado com sucesso!" : "Produto cadastrado com sucesso!");
    limparFormulario();
    carregarProdutos();
  } catch (erro) {
    mostrarMensagem(erro.message, true);
  }
});

async function editarProduto(id) {
  try {
    const resposta = await fetch(`${API}/${id}`);
    const produto = await resposta.json();

    if (!resposta.ok) {
      throw new Error(produto.erro);
    }

    produtoId.value = produto.id;
    nome.value = produto.nome;
    categoria.value = produto.categoria;
    preco.value = produto.preco;
    estoque.value = produto.estoque;

    tituloForm.textContent = "Editar produto";
    btnSalvar.textContent = "Salvar alterações";
    btnCancelar.hidden = false;

    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch (erro) {
    mostrarMensagem(erro.message, true);
  }
}

async function excluirProduto(id) {
  const confirmar = confirm("Tem certeza que deseja excluir este produto?");

  if (!confirmar) return;

  try {
    const resposta = await fetch(`${API}/${id}`, {
      method: "DELETE"
    });

    const resultado = await resposta.json();

    if (!resposta.ok) {
      throw new Error(resultado.erro);
    }

    mostrarMensagem("Produto removido com sucesso!");
    carregarProdutos();
  } catch (erro) {
    mostrarMensagem(erro.message, true);
  }
}

function cancelarEdicao() {
  limparFormulario();
}

function limparFormulario() {
  form.reset();
  produtoId.value = "";
  tituloForm.textContent = "Cadastrar produto";
  btnSalvar.textContent = "Cadastrar";
  btnCancelar.hidden = true;
}

function mostrarMensagem(texto, erro = false) {
  mensagem.textContent = texto;
  mensagem.style.color = erro ? "#b91c1c" : "#1f6f43";

  setTimeout(() => {
    mensagem.textContent = "";
  }, 3000);
}

function escaparHTML(texto) {
  return String(texto)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

carregarProdutos();