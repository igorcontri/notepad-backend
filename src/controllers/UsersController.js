const { hash, compare } = require("bcryptjs");
const AppError = require("../utils/AppError");

const UserRepository = require("../repositories/UserRepository");
const sqLiteConnection = require("../database/sqlite");
class UsersController {
  async create(req, res) {
    const { name, email, password } = req.body;

    const userRepository = new UserRepository();

    const checkUserExists = await userRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError("This email already exists.");
    }

    const hashedPassword = await hash(password, 8);

    await userRepository.create({ name, email, password: hashedPassword });

    return res.status(201).json();
  }

  async update(req, res) {
    const { name, email, password, old_password } = req.body;
    const user_id = req.user.id;

    const database = await sqLiteConnection();
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [
      user_id,
    ]);

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
      [user.name, user.email, user.password, user_id]
    );

    return res.status(200).json();
  }
}

module.exports = UsersController;
