const User = require('./../models/user-model')

const validateRol = async (request, response, next) => {
    const { userId } = request;
 

    const user = await User.findOne({_id: userId });
    console.log(user);
    if (user.rol === 'PENDING') {
        return response.status(401).send({
            ok: false,
            error: 'El usuario no tiene rol asignado, ni permisos'
        });
    }

    next ();
}

module.exports = {
    validateRol
}