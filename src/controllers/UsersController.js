const AppError = require("../utils/AppError");

/* Um ontroller, pode conter, no máximo, cinco funções
      
    * index - GET para listar vários registros.
    * show - GET para exibir um registro específico
    * create - POST para criar um resgistro
    * update - PUT para atualizar um registro
    * delete - DELETE para remover um registro
*/
class UsersController {
    create(req, res) {
        const { name, email, password } = req.body;

        if (!name) {
            throw new AppError("'Name'is required");
        }

        res.status(201).json({ name, email, password });
    }
}

module.exports = UsersController;
