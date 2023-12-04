const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const createUserToken = require('../helpers/create-user-token.js');

module.exports = class UserController {

    static async singup(req, res) {

        const { name, email, phones, password, confirmpassword } = req.body;
        if (!name) {
            res.status(401)
                .json({ message: 'Nome é obrigatório' });
            return;
        }

        if (!email) {
            res.status(401)
                .json({ message: 'E-mail é obrigatório' });
            return;

        }
        if (!phones) {
            res.status(401)
                .json({ message: 'Telefone é obrigatório' });
            return;

        }
        if (!password) {
            res.status(401)
                .json({ message: 'A senha é obrigatório' });
            return;

        }
        if (!confirmpassword) {
            res.status(401)
                .json({ message: 'A confirmação de senha  é obrigatório' });
            return;

        }

        if (password !== confirmpassword) {
            res.status(401)
                .json({ message: 'As senhas não conferem;' });
            return;

        }

        const userExist = await User.findOne({ email: email });

        if (userExist) {
            res.status(401)
                .json({ message: 'E-mail já existente' });
            return;
        }

        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = new User({
            name: name,
            email: email,
            phones: phones,
            password: hashedPassword,
        });

        try {
            const newUser = await user.save();
            await createUserToken(newUser, req, res);

        } catch (error){
            res.status(401)
               .json({ message: error.message });
            return;
        }

    }

    static async singin(req, res) {
        const { email, password } = req.body;
        if (!email) {
            res.status(401)
                .json({ message: 'E-mail é obrigatório' });
            return;

        }
        if (!password) {
            res.status(401)
                .json({ message: 'A Senha é obrigatório' });
            return;

        }
        const user = await User.findOne({ email: email });

        if (!user) {
            res.status(401)
                .json({ message: 'Usuário e/ou senha inválidos' });
            return;
        }
        const checkPassword = await bcrypt.compare(password, user.password);

        if (!checkPassword) {
            res.status(401)
                .json({ message: 'Usuário e/ou senha inválidos' });
            return;
        }

        await createUserToken(user, req, res);
    
    }
}

