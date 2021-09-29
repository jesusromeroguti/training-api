// Fichero principal
require('dotenv').config()

// Ejecuta los modelos 
require('./db')

const express = require('express')
const cors = require('cors')

// Importar los modelos
const Muscle = require('./models/Muscle')
const musclesRouter = require('./controllers/muscles')

const app = express()

// Permite peticiones de cualquier origen
app.use(cors())

// BodyParser. Parsea el resultado de la petición
app.use(express.json())

app.get('/hello', (request, response) => {
    response.json("Hello World!")

    const m = new Muscle({
        name: "Pes mort",
        description: "Motherfucker!"
    })
    
    m.save()
        .then( res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
})


app.use('/v1/muscles', musclesRouter)

const PORT = process.env.PORT
const server = app.listen(PORT, () => {
  console.log(`Server runing on port ${PORT}`)
})

module.exports = {server, app}