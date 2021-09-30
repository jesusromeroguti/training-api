// Fichero esquema de Muscle
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

// Definimos el schema
const muscleSchema = new mongoose.Schema({
    muscleId:{
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
muscleSchema.plugin(uniqueValidator)

// Modificamos la función toJson para mostrar lo que queremos
muscleSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v 
    }
})

const Muscle = mongoose.model('Muscle', muscleSchema)

module.exports = Muscle