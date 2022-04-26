import { Router } from 'express';
import { PersonajeService } from '../services/personajeService.js';

const router = Router();
const personajeService = new personajeService();

router.get('', async (req, res) => {
    console.log(`This is a get operation`);
    
    const pizzas = await pizzaService.getPizza();
  
    return res.status(200).json(pizzas);
  });