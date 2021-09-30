// Fichero esquema Level
/*
    Nivel de habilidad subjetiva necesaria para poder ejecutar un ejercicio
    Niveles: Beginner, Intermediate, Advanced
    Tambien lo podemos entender como nivel de dificultad del ejercicio
*/
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

// Definimos el schema
const levelSchema = new mongoose.Schema({
    levelId: {
        type: Number,
        unique: true
    },
    name: {
        type: String,
        unique: true
    },
    exercises: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exercise'  
    }]
})

// Aplicamos el validador de campos únicos
levelSchema.plugin(uniqueValidator)

// Modificamos la función toJson para mostrar lo que queremos
levelSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v 
    }
})

const Level = mongoose.model('Level', levelSchema)

module.exports = Level