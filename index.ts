// Fichero principal
require('dotenv').config()

// Ejecuta los modelos 
require('./db')

import express, {Request, Response, NextFunction } from 'express';
import cors from 'cors';


// Importar los modelos
// const Muscle = require('./models/Muscle')
// const musclesRouter = require('./controllers/muscles')

const app = express()

// Permite peticiones de cualquier origen
app.use(cors())

// BodyParser. Parsea el resultado de la petición
app.use(express.json())

app.get('/hello', (req: Request, res: Response, next: NextFunction) => {
    res.send("Api is alive");

})


// app.use('/v1/muscles', musclesRouter)

const PORT = process.env.PORT
const server = app.listen(PORT, () => {
  console.log(`Server runing on port ${PORT}`)
})

module.exports = {server, app}