import express from 'express'
import PersonajeController from './src/controllers/personajeController.js'

const server = express();
const puerto = 2548;

server.use(express.json());
server.use('/personaje',PersonajeController);

server.listen(puerto, () => {
    console.log(`This is a server on the port ${puerto}`);
})