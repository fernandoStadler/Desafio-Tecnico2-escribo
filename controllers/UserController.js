const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createUserToken = require('../helpers/create-user-token.js');
const getToken = require('../helpers/get-token.js');

module.exports = class UserController {

    static async singup(req, res) {
        const { name, email, phones, password, confirmpassword } = req.body;

        if (!name || !email || !phones || !password || !confirmpassword) {
            res.status(401).json({ message: 'Todos os campos são obrigatórios' });
            return;
        }

        if (password !== confirmpassword) {
            res.status(401).json({ message: 'As senhas não conferem' });
            return;
        }

        const userExist = await User.findOne({ email: email });

        if (userExist) {
            res.status(401).json({ message: 'E-mail já existente' });
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
        } catch (error) {
            res.status(401).json({ message: error.message });
            return;
        }
    }

    static async singin(req, res) {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(401).json({ message: 'E-mail e senha são obrigatórios' });
            return;
        }

        const user = await User.findOne({ email: email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            res.status(401).json({ message: 'Usuário e/ou senha inválidos' });
            return;
        }

        await createUserToken(user, req, res);
    }

    static async checkuser(req, res) {
        const token = getToken(req);
        const secret = "EuAmeiOfitCulturalDaEmpresa"

        if (!token) {
            res.status(401).json({ message: 'Não autorizado' });
            return;
        }

        try {
            const decoded = jwt.verify(token, secret);
            const currentUser = await User.findById(decoded.id);
            currentUser.password = undefined;
            res.status(200).send(currentUser);
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                res.status(401).json({ message: 'Sessão expirada' });
            } else {
                res.status(401).json({ message: 'Não autorizado' });
            }
        }
    }
}
