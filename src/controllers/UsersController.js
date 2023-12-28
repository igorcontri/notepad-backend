const { hash, compare } = require("bcryptjs");
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

    const hashedPassword = await hash(password, 8);

    await database.run(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    return res.status(201).json();
  }

  async update(req, res) {
    const { name, email, password, old_password } = req.body;
    const { id } = req.params;

    const database = await sqLiteConnection();
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]);

    if (!user) {
      throw new AppError("User not found.");
    }

    const userWithUpdateEmail = await database.get(
      "SELECT * FROM users WHERE email = (?)",
      [email]
    );

    if (userWithUpdateEmail && userWithUpdateEmail.id !== user.id) {
      throw new AppError("This email already exists.");
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if (password && !old_password) {
      throw new AppError("Error! Old password required");
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError("Error! Wrong Password");
      }

      user.password = await hash(password, 8);
    }

    await database.run(
      `
            UPDATE users SET
            name = ?,
            email = ?,
            password = ?,
            updated_at = DATETIME('now')
            WHERE id = ?
        `,
      [user.name, user.email, user.password, id]
    );

    return res.status(200).json();
  }
}

module.exports = UsersController;
