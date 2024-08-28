class UsersController {
    tomate(request, response) {
        const { name, email, password } = request.body;

        // "send" devolve um espécie de html, mas é possivel devolver um "Json" como é o segundo caso
        // response.send(`Usuário: ${name}. E-mail: ${email}. Senha: ${password}`);
        response.json({ name, email, password });
    }
}

module.exports = UsersController;
