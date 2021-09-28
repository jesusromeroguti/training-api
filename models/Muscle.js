// Fichero esquema de Muscle
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

// Definimos el schema
const muscleSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    description: String
})

// Aplicamos el validador de campos únicos
muscleSchema.plugin(uniqueValidator)

muscleSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v 
    }
})

const Muscle = mongoose.model('Muscle', muscleSchema)

module.exports = Muscle