import { Router } from 'express';
import { PersonajeService } from '../services/personajeService.js';

const router = Router();
const personajeService = new PersonajeService();

router.get('', async (req, res) => {
    console.log(`This is a get operation`);
    
    const personajes = await personajeService.getAllPersonaje();
  
    return res.status(200).json(personajes);
  });

router.get('/:id', async (req, res) => {
  console.log(`Request URL Param: ${req.params.id}`);
  console.log(`This is a get operation`);

  const personaje = await personajeService.getPersonajeById(req.params.id);

  return res.status(200).json(personaje);
});

router.post('', async (req, res) => {
  console.log(`This is a post operation`);

  const personaje = await personajeService.createPersonaje(req.body);

  return res.status(201).json(personaje);
});

router.put('/:id', async (req, res) => {
  console.log(`Request URL Param: ${req.params.id}`);
  console.log(`This is a put operation`);

  const personaje = await personajeService.updatePersonajeById(req.params.id, req.body);

  return res.status(200).json(personaje);
});

router.delete('/:id', async (req, res) => {
  console.log(`Request URL Param: ${req.params.id}`);
  console.log(`This is a delete operation`);

  const personaje = await personajeService.deletePersonajeById(req.params.id);

  return res.status(200).json(personaje);
});

router.get('/search/hola', async(req, res) => {
    console.log(`This is a get operation`);
    console.log(req.query.nombre);
    const personajes = await personajeService.getPersonajeByNombre(req.query.nombre);
   
    return res.status(200).json(personajes);
});

router.get('/search/chau', async(req, res) => {
  console.log(`This is a get operation`);
  console.log(req.query.edad);
  const personajes = await personajeService.getPersonajeByEdad(req.query.edad);
 
  return res.status(200).json(personajes);
});


export default router;