const express = require('express');
const { validateUser } = require('./../middlewares/validate-user')
const { validateRol } = require('./../middlewares/validate-rol')




const { 
    createUser,
    readUser,
    authUser
} = require('./../controllers/users-controllers');
const { validateRol } = require('../middlewares/validate-rol');

//Router
const router = express.Router();

router.post('/',[validateUser, validateRol], createUser);

router.get('/', readUser);

router.get('/:id', readUser)

router.post('/auth/', authUser);

//GET, POST, PATCH, DELETE > users

module.exports = router;