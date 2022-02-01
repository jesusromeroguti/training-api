// Fichero esquema de User
/*
    Usuarios que pueden utilizar la API
*/
import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

export interface User {
    username: string;
    password: string;
    email: string;
}

// Definimos el schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    // Password se guarda hasheada
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
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

export const UserModel = mongoose.model('User', userSchema, 'User');