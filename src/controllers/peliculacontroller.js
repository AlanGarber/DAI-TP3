import { Router } from 'express';
import { PeliculaService } from '../services/peliculaService.js';
import { Authenticate } from '../common/jwt.js';

const router = Router();
const peliculaService = new PeliculaService();

router.get('/', Authenticate, async (req, res) => {
    console.log(`This is a get operation`);
    let Titulo=req.query.Titulo
    let Orden=req.query.Orden

    const peliculas = await peliculaService.getAllPelicula(Titulo, Orden);
  
    return res.status(200).json(peliculas);
  });

router.get('/:id', Authenticate, async (req, res) => {
  console.log(`Request URL Param: ${req.params.id}`);
  console.log(`This is a get operation`);

  const pelicula = await peliculaService.getPeliculaById(req.params.id);

  return res.status(200).json(pelicula);
});

router.post('', Authenticate, async (req, res) => {
  console.log(`This is a post operation`);

  const pelicula = await peliculaService.createPelicula(req.body);

  return res.status(201).json(pelicula);
});

router.put('/:id', Authenticate, async (req, res) => {
  console.log(`Request URL Param: ${req.params.id}`);
  console.log(`This is a put operation`);

  const pelicula = await peliculaService.updatePeliculaById(req.params.id, req.body);

  return res.status(200).json(pelicula);
});

router.delete('/:id', Authenticate, async (req, res) => {
  console.log(`Request URL Param: ${req.params.id}`);
  console.log(`This is a delete operation`);

  const pelicula = await peliculaService.deletePeliculaById(req.params.id);

  return res.status(200).json(pelicula);
});

export default router;