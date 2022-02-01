// Fichero esquema de Muscle
import {Schema, Types, model} from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import { Exercise } from './Exercise';

export interface Muscle {
    name: string,
    exercises: (Exercise | Types.ObjectId)[]
}

// Definimos el schema
const muscleSchema = new Schema({
    muscleId:{
        type: Number,
        unique: true
    },
    name: {
        type: String,
        unique: true
    },
    exercises: [{
        type: Types.ObjectId,
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

export const MuscleModel = model('Muscle', muscleSchema, 'Muscle')