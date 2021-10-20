const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);
//CRUD
const userColl = require('./../models/user-model');

//users ID, name, rol, status
//POST
const createUser = (request, response) => {
    const user = request.body;
    if (!user.name) {
        return response.status(400).send({ ok: false })
}

const newUser = new userColl(user);
newUser.save((error, result) =>{
    if (error) {
        return response.status(500).send({error});
    }
    return response.send(result);
});
    
};

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

//PATCH
const updateUser = (request, response) => {
    const id = request.params.id;
    if (!id) {
        return response.status(400).send({ error: 'no hay id para modificaar' });
    }

    userColl.updateOne({ iduser: id}, request.body, (error, result) => {
        if (error) {
            return response.status(500).send({error});
        }

        userColl.find({ iduser: id }, request.body, (error, result) => {
            if (error) {
                return response.status(500).send({error});
            }
            return response.send(result);
        });
    });
};

//DELETE
const deleteUser = (request, response) => {
    const id = request.params.id;
    if (!id) {
        return response.status(400).send({error: 'No hay id, para eliminar'});   
    }
    userColl.deleteOne({ iduser: id},(error, result) =>{
        if (error){
            return response.status(500).send({error});
        }
        return response.send(result);
    });
};

const authWithGoogle = (request, response) => {
    const tokenFrom
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID,
    })
}
module.exports = {
    createUser,
    readUser,
    updateUser,
    deleteUser,
};