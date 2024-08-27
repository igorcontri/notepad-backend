const express = require("express");

const routes = require("./routes");

const app = express();
// Isso indica ao node qual será o formato padrão para receber informações através do corpo da requisição (no caso, json)
app.use(express.json());

app.use(routes);

const PORT = 3333;
app.listen(PORT, () => console.log(`Server is Running on "localhost:${PORT}"`));
