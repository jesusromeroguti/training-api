// Fichero esquema Level
/*
    Nivel de habilidad subjetiva necesaria para poder ejecutar un ejercicio
    Niveles: Beginner, Intermediate, Advanced
    Tambien lo podemos entender como nivel de dificultad del ejercicio
*/
import {Schema, Types, model} from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator'
import { Exercise } from './Exercise';

export interface Level {
    name: string;
    exercises: (Exercise | Types.ObjectId)[];
}

// Definimos el schema
const levelSchema = new Schema({
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
levelSchema.plugin(uniqueValidator)

// Modificamos la función toJson para mostrar lo que queremos
levelSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v 
    }
})

export const LevelModel = model('Level', levelSchema, 'Level');