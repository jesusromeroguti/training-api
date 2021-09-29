// Fichero esquema de User
/*
    Usuarios que pueden utilizar la API
*/
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

// Definimos el schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    // Password se guarda hasheada
    password: {
        type: String
    },
    email: {
        type: String,
        unique: true
    }
})

// Aplicamos el validador de campos únicos
userSchema.plugin(uniqueValidator)

// Modificamos la función toJson para mostrar lo que queremos
userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v 
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User