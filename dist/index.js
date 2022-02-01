"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Fichero principal
require('dotenv').config();
// Ejecuta los modelos 
require('./db');
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// Importar los modelos
const Muscle = require('./models/Muscle');
const musclesRouter = require('./controllers/muscles');
const app = (0, express_1.default)();
// Permite peticiones de cualquier origen
app.use((0, cors_1.default)());
// BodyParser. Parsea el resultado de la petición
app.use(express_1.default.json());
// app.get('/hello', (request: Request, response: Response) => {
//     response.json("Hello World!")
//     const m = new Muscle({
//         name: "Pes mort",
//         description: "Motherfucker!"
//     })
//     m.save()
//         .then( res => {
//             console.log(res)
//         })
//         .catch(err => {
//             console.log(err)
//         })
// })
app.use('/v1/muscles', musclesRouter);
const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
    console.log(`Server runing on port ${PORT}`);
});
module.exports = { server, app };
