//lembrando "destructuring", isso equivale a usar o "express.Router()"" se eu tivesse importanto toda a biblioteca express (const express = require("express"))
const { Router } = require("express");

const usersRoutes = Router();

app.post("/users", (request, response) => {
    const { name, email, password } = request.body;

    // "send" devolve um espécie de html, mas é possivel devolver um "Json" como é o segundo caso
    // response.send(`Usuário: ${name}. E-mail: ${email}. Senha: ${password}`);
    response.json({ name, email, password });
});

module.exports = usersRoutes;
