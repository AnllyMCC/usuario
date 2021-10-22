const bcrypt = requiere('bcryptjs')
const jwt = require('jsonwebtoken');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);
//CRUD
const userColl = require('./../models/user-model');

//POST
const createUser = async (request, response) => {
    const user = request.body;

if (!user.name) {
    return response.status(400).send({ 
        ok: false,
        error: 'Falta nombre', 
    });
}

if (!user.email) {
    return response.status(400).send({
         ok: false, 
         error: 'Falta correo',
    });
}

if (!user.withGoogle && !user.password) {
    return response.status(400).send({
         ok: false, 
         error: 'Falta contraseña',
    });
}
let encryptedPassword;
if (!user.withGoogle) {
    const salt = bcrypt.genSaltSync()
    encryptedPassword = bcrypt.hashSync(user.password, salt);        
}

const existingUser = await User.findOne({ email: user.email});
if (existingUser._id && existingUser._id) {
    return response.status(302).send({
        ok: false, 
        error: 'El usuario ya está registrado ',
    });
}
}

const newUser = new userColl(user);
newUser.save((error, result) =>{
    if (error) {
        return response.status(500).send({error});
    }
    return response.send(result);
});

//GET
const readUser = (request, response) => {
    const id = request.params.id;

    const filter = {};
    if (id) {
        filter.idUsuario = id;
    }
    
    userColl.find(filter, (error, result) => {
        if (error) {
            return response.status(500).send({ error });
        }
        return response.send(result);
    });
};


const authUser = async (request, response) => {
    const user = request.body;
    const userFromDb = await User.findOne({ email: user.email });
        if (userFromDb) {

    const isValid = userFromDb.withGoogle 
    ? true: 
    bcrypt.compareSync(user.password || '', userFromDb.password); 
    
    if (!isValid) {
        return response. status(401).send({ 
            ok: false, 
            error: 'Usuario no autorizado '});
    }


    
    const token= jwt.sign({ id: userFromDb._id }, process.env.JWT_SECRET, {
        expiresIn: '4h'
    })
     return response.send({ ok: isValid, token });
        }

return response.status(404).send({
    ok: false,
    error: 'El usuario no está registrado',
    });
};

module.exports = {
    createUser,
    readUser,
}