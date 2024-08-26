const express = require("express");

const app = express();

app.get("/message/:id/:user", (request, response) => {
  // Desestruturação evita que precise repetir "request.params" para chegar nessas variárveis, é como se "cortasse o caminho"
  const { id, user } = request.params;

  response.send(`
    Message ID: ${id}.
    User: ${user}.
  `);
});

const PORT = 3333;
app.listen(PORT, () => console.log(`Server is Running on Port ${PORT}`));

// ROUTE PARAMS  ==  /message/:id  == ":" indica que é um parâmetro; "id" pode levar qualquer nome desejado;
