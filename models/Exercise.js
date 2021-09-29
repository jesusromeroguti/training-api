// Fichero esquema de Exercise
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

// Definimos el schema
const exerciseSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true
    },
    name: {
        type: String,
        unique: true
    },
    description: String,
    instructions: String,
    images: [String],
    videos: [String],
    muscles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Muscle'
    }],
    category: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }],
    equipment: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Equipment'
    }],
    // variations: [mongoose.Schema.Types.ObjectId],
    variations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exercise'
    }],
    level: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Level'
    },
    comments: [String],
    links: [String]
})

// Aplicamos el validador de campos únicos
exerciseSchema.plugin(uniqueValidator)

// Modificamos la función toJson para mostrar lo que queremos
exerciseSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v 
    }
})

const Exercise = mongoose.model('Exercise', exerciseSchema)

module.exports = Exercise