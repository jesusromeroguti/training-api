// Fichero esquema de Equipment
/*
    Equipamiento necesario para el ejercicio
*/
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

// Definimos el schema
const equipmentSchema = new mongoose.Schema({
    equipmentId: {
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
equipmentSchema.plugin(uniqueValidator)

// Modificamos la función toJson para mostrar lo que queremos
equipmentSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v 
    }
})

const Equipment = mongoose.model('Equipment', equipmentSchema)

module.exports = Equipment