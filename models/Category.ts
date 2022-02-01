// Fichero esquema de Category
/*
    Categorias en las que se puede englobar un ejercicio.
*/
import {Schema, Types, model} from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator'
import { Exercise } from './Exercise';

export interface Category {
    name: string;
    exercises: ( Exercise | Types.ObjectId)[];
}

// Definimos el schema
const categorySchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    exercises: [
        {
            type: Types.ObjectId,
            ref: 'Exercise'  
        },
    ]
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

export const CategoryModel = model('Category', categorySchema, 'Category');
