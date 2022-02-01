// Fichero esquema de Equipment
/*
    Equipamiento necesario para el ejercicio
*/

import {Schema, Types, model} from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator'
import { Exercise } from './Exercise';

export interface Equipment {
    name: string;
    exercises: (Exercise | Types.ObjectId)[];
}

// Definimos el schema
const equipmentSchema = new Schema({
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
equipmentSchema.plugin(uniqueValidator)

// Modificamos la función toJson para mostrar lo que queremos
equipmentSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v 
    }
})

export const EquipmentModel = model('Equipment', equipmentSchema, 'Equipment');