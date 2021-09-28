// Fichero principal
require('dotenv').config()

// Ejecuta los modelos 
require('./db')

const express = require('express')
const cors = require('cors')

// Importar los modelos
const Muscle = require('./models/Muscle')

const app = express()

// Permite peticiones de cualquier origen
app.use(cors())

// BodyParser. Parsea el resultado de la petición
app.use(express.json())

app.get('/api', (request, response) => {
    response.json("Hello World!")

    const m = new Muscle({
        name: "Squat",
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

app.get('/muscles', (request, response) => {
    Muscle.find({})
        .then(muscle => {
            console.log(muscle)
            response.json(muscle)
        })
        .catch(err => {
            console.error(err)
        })

})

 // Note.find({})
  // .then(notes => {
  //   response.json(notes)
  // })
  // .catch(err => {
  //   console.error(err)
  // })

const PORT = process.env.PORT
const server = app.listen(PORT, () => {
  console.log(`Server runing on port ${PORT}`)
})

module.exports = {server, app}