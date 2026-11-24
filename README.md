# Estoque Fácil

Sistema CRUD de produtos com HTML, CSS, JavaScript, Node.js, Express e Sequelize.

## Executar localmente

1. Instale o Node.js LTS.
2. No terminal, dentro da pasta do projeto, execute `npm install`.
3. Execute `npm start`.
4. Acesse `http://localhost:3000`.

Sem a variável `DATABASE_URL`, o projeto usa o arquivo local `database.sqlite`.

## Deploy na Vercel

O frontend fica na raiz do projeto e a API fica em `api/[...path].js`.

1. Crie um banco PostgreSQL no Neon.
2. Copie a connection string do banco (preferencialmente a URL pooled).
3. No projeto da Vercel, em Settings > Environment Variables, crie `DATABASE_URL` com essa URL.
4. Faça o deploy. O Sequelize cria a tabela `Produtos` na primeira chamada da API.

A Vercel não mantém o arquivo SQLite local persistente. Por isso, o deploy usa PostgreSQL quando `DATABASE_URL` está configurada. Não envie senhas nem arquivos `.env` ao GitHub.

## Build

Execute `npm run build` para validar a preparação dos arquivos estáticos e da API.
