const mongoose = require('mongoose');
const { Schema } = mongoose;

function requiresPassword (){
    return !this.withGoogle;
}

const userSchema = new Schema ({
    iduser: {
        type:String,
        required: true,
    },
    name: {
        type:String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: requiresPassword
    },
    rol: {
        type:String,
        default: 'PENDING', 
        enum: ['ADMIN', 'SALES', 'PENDING'],
    },
    status: {
        type:String,
        required: true,
    },
    withGoogle: {
        type: Boolean,
        default: false,
    } 

});

    userSchema.methods.toJSON = function () {
        return { ...this.toObject(), password: undefined };
    }

module.exports = mongoose.model('usuarios', userSchema);
