const AppError = require("../utils/AppError");

const sqLiteConnection = require("../database/sqlite");

/* Um controller, pode conter, no máximo, cinco funções
      
    * index - GET para listar vários registros.
    * show - GET para exibir um registro específico
    * create - POST para criar um resgistro
    * update - PUT para atualizar um registro
    * delete - DELETE para remover um registro
*/
class UsersController {
    async create(req, res) {
        const { name, email, password } = req.body;

        const database = await sqLiteConnection();

        const checkUserExists = await database.get(
            "SELECT * FROM users WHERE email = (?)",
            [email]
        );

        if (checkUserExists) {
            throw new AppError("This email already exists.");
        }

        await database.run(
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
            [name, email, password]
        );

        return res.status(201).json();
    }
}

module.exports = UsersController;
