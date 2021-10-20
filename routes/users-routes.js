const express = require('express');
const { 
    createUser,
    readUser,
    updateUser,
    deleteUser,
} = require('./../controllers/users-controllers');

//Router
const router = express.Router();

router.post('/', createUser);

router.get('/', readUser);

router.get('/:id', readUser)

router.patch('/:id', updateUser);

router.delete('/:id', deleteUser);

//GET, POST, PATCH, DELETE > users

module.exports = router;