const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema ({
    iduser: {
        type:String,
        required: true,
    },
    name: {
        type:String,
        required: true,
    },
    rol: {
        type:String,
        required: true,
    },
    status: {
        type:String,
        required: true,
    }

});

module.exports = mongoose.model('usuarios', userSchema);
