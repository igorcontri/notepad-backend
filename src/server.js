const express = require("express");

const app = express();

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
app.get("/users", (request, response) => {
    const { page, limit } = request.query;

    response.send(`Página: ${page}. Mostrar: ${limit}`);
});

const PORT = 3333;
app.listen(PORT, () => console.log(`Server is Running on Port ${PORT}`));
