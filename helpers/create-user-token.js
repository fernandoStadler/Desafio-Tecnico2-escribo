const jwt = require("jsonwebtoken");

const createUserToken = async (user, req, res) =>{
    const token = jwt.sign({
        name:user.name,
        id:user.id
    },  "EuAmeiOfitCulturalDaEmpresa")

    res.status(201).json({
    user:user._id,
    data_da_atualizacao:user.createdAt,
    data_da_criacao:user.updatedAt,
    token:token,


})

}

module.exports = createUserToken;