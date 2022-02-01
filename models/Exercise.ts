// Fichero esquema de Exercise
import {Schema, Types, model} from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator'
import { Muscle } from './Muscle';
import { Category } from './Category';
import { Equipment } from './Equipment';
import { Level } from './Level';

export interface Exercise {
    name: string,
    description?: string,
    instructions?: string,
    images?: string[],
    videos?: string[],
    muscles?: (Muscle | Types.ObjectId)[],
    category?: (Exercise | Types.ObjectId)[],
    equipment?: (Equipment | Types.ObjectId)[],
    variations?: (Exercise | Types.ObjectId)[],
    level?: (Level | Types.ObjectId)[],
    comments?: string,
    links?: string,
}

// Definimos el schema
const exerciseSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    description: String,
    instructions: String,
    images: [String],
    videos: [String],
    muscles: [{
        type: Types.ObjectId,
        ref: 'Muscle'
    }],
    category: [{
        type: Types.ObjectId,
        ref: 'Category'
    }],
    equipment: [{
        type: Types.ObjectId,
        ref: 'Equipment'
    }],
    // variations: [Types.ObjectId],
    variations: [{
        type: Types.ObjectId,
        ref: 'Exercise'
    }],
    level: {
        type: Types.ObjectId,
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

export const ExerciseModel = model('Exercise', exerciseSchema, 'Exercise')
