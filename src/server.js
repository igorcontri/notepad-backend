require("express-async-errors");
const migrationsRun = require("./database/sqlite/migrations");
const AppError = require("./utils/AppError");

const express = require("express");
const routes = require("./routes");

migrationsRun();

const app = express();
app.use(express.json());

app.use(routes);

app.use((error, req, res, next) => {
  /*Se o erro for de "AppError" = client error */
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }

  console.error(error);

  /* Se não for "AppError" = server error */
  return res.status(500).json({
    status: "error",
    message: "internal server error",
  });
});

const PORT = 3333;
app.listen(PORT, () => console.log(`Server is running on localhost:${PORT}`));
