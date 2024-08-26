const express = require("express");

const app = express();
// Isso indica ao node qual será o formato padrão para receber informações através do corpo da requisição (no caso, json)
app.use(express.json());

// ROUTE PARAMS
// /message/:id  == ":" indica que é um parâmetro; "id" pode levar qualquer nome desejado; parametros sao obrigatórios para acessar a página
app.get("/message/:id/:user", (request, response) => {
    // Desestruturação evita que precise repetir "request.params" para chegar nessas variárveis, é como se "cortasse o caminho"
    const { id, user } = request.params;

    response.send(`
    Message ID: ${id}.
    User: ${user}.
  `);
});

// QUERY PARAMS
// /users?page=2&limit=10   ==  "?" é o separador; "page" é a variável; "=2" é o valor; "&" para adicionar mais um parametro (no caso, "limit")...
// Query não sao parametros obrigatórios, você conseguirá acessar a rota, mas os valores, se não declarados, serão undefined.
app.get("/users", (request, response) => {
    const { page, limit } = request.query;

    response.send(`Página: ${page}. Mostrar: ${limit}.`);
});

app.post("/users", (request, response) => {
    const { name, email, password } = request.body;

    // "send" devolve um espécie de html, mas é possivel devolver um "Json" como é o segundo caso
    // response.send(`Usuário: ${name}. E-mail: ${email}. Senha: ${password}`);
    response.json({ name, email, password });
});

const PORT = 3333;
app.listen(PORT, () => console.log(`Server is Running on Port ${PORT}`));
