// Fichero esquema de Category
/*
    Categorias en las que se puede englobar un ejercicio.
*/
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

// Definimos el schema
const categorySchema = new mongoose.Schema({
    categoryId: {
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
categorySchema.plugin(uniqueValidator)

// Modificamos la función toJson para mostrar lo que queremos
categorySchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v 
    }
})

const Category = mongoose.model('Category', categorySchema)

module.exports = Category