import express from "express";
import cors from "cors";
import PersonajeRouter from "./src/controllers/personajeController.js";
import PeliculaRouter from "./src/controllers/peliculaController.js";
import AuthRouter from "./src/controllers/authController.js";
import passport from 'passport';
import { jwtStrategy } from './src/common/jwt.js';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

const app = express();
const port = 5000;
const specs = swaggerJsDoc(options);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use(cors());
app.use(express.json());
passport.use(jwtStrategy);
app.use(passport.initialize());

app.use("/characters", PersonajeRouter);
app.use("/movies", PeliculaRouter);
app.use("/auth", AuthRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});