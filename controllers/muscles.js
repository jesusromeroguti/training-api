const musclesRouter = require('express').Router()
const Muscle = require('../models/Muscle')

// Obtiene todos los musculos.
musclesRouter.get('/', async (request, response) => {
    try {
        // Buscamos todos los muscles
        const muscles = await Muscle.find({})
        response.status(200).json(muscles)
        console.log(muscles)
    // Tratar el error con un middleware
    } catch (err){
        console.log(err)
        response.status(500).json({
            message: "Internal Server Error"
        })
    }
})

// Obtiene un muscle por id
musclesRouter.get('/getById/:id', async (request, response) => {
    const id = request.params.id
    try {
        const muscle = await Muscle.find({muscleId:id})

        if(muscle.length !== 0) {
            console.log(muscle)
            response.status(200).json({
                status_code: 200, 
                message: "Muscle found", 
                data: muscle, 
                version: "0.0.1"
            })
        }
        else {
            response.status(404).json({
                status_code: 404, 
                message: "Muscle not found", 
                data: muscle, 
                version: "0.0.1"
            })
        }
    } catch(err){
        console.error(err)
    } 
})

// Obtiene un musculo por Name
musclesRouter.get('/getByName', async (request, response) => {
    const name = request.body.name

    if(!name){
        response.status(400).json({
            status_code: 400,
            message: "name missing or invalid",
            data: [],
            version: "0.0.1"
        })
    }
    try {
        const muscle = await Muscle.find({name:name})

        if(muscle.length !== 0){
            console.log(muscle)
            response.status(200).json({
                status_code: 200, 
                message: "Muscle found", 
                data: muscle, 
                version: "0.0.1"
            })
        } else {
            response.status(404).json({
                status_code: 404,
                message: "Muscle not found",
                data: [],
                version: "0.0.1"
            })
        }
    } catch(err){
        console.error(err)
    } 
})

module.exports = musclesRouter