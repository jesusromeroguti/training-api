const musclesRouter = require('express').Router()
const { response, request } = require('express')
const Muscle = require('../models/Muscle')

musclesRouter.get('/', async (request, response) => {
    try {
        const muscles = await Muscle.find({})
        response.status(200).json(muscles)
    } catch (err){
        console.log(err)
        response.status(500).json({
            message: "Internal Server Error"
        })
    }
})

musclesRouter.get('/hello', (request, response) => {
    response.json("Hola maquina")
    console.log("Hola maquina")
})

// musclesRouter.get('/:id')

module.exports = musclesRouter