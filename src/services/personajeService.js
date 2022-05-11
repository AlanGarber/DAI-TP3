import sql from 'mssql'
import config from '../../db.js'
import 'dotenv/config'
import { parse } from 'dotenv';

const personajeTabla=process.env.DB_TABLA_PERSONAJE;
const personajeXPeliculaTabla=process.env.DB_TABLA_PxP;
const peliculaTabla=process.env.DB_TABLA_PELICULA;

export class PersonajeService {

    getAllPersonaje = async (nombre,edad,Movie) => {
        console.log('This is a function on the service');
        const pool = await sql.connect(config);
        let response = 0;

        if(nombre && edad){
            response = await pool.request()
                .input('edad',sql.Int, edad)
                .input('nombre',sql.VarChar, nombre)
                .query(`SELECT * from ${personajeTabla} WHERE Edad=@edad AND Nombre=@nombre`);
        }
        else if(edad){
             response = await pool.request()
                .input('edad',sql.Int, edad)
                .query(`SELECT * from ${personajeTabla} WHERE Edad=@edad`);
        }
        else if(nombre){
            response = await pool.request()
                .input('nombre',sql.VarChar, nombre)
                .query(`SELECT * from ${personajeTabla} WHERE Nombre=@nombre`);
        }
        else if(Movie){

        }
        else{
            response = await pool.request()
                .query(`SELECT * from ${personajeTabla}`);
        }

        console.log(response)

        return response.recordset;
    }

    getPersonajeById = async (id) => {
        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const response = await pool.request()
                .input('id',sql.Int, id)
                .query(`SELECT m.* 
                        FROM ${peliculaTabla} m , ${personajeTabla} p, ${personajeXPeliculaTabla} pp 
                        WHERE m.idPelicula = pp.idPelicula and p.idPersonaje = pp.idPersonaje`);
        let helper = await pool.request()
                .input('id',sql.Int, id)
                .query(`SELECT p.* 
                        ${personajeTabla} p 
                        WHERE p.idPersonaje=@id`);
        console.log(response)

        helper.recordset[0].movies=response.recordset;
        return helper.recordset[0];
    }

    getPersonajeByNombre = async (nombre) => {
        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('nombre',sql.VarChar, nombre)
            .query(`SELECT * from ${personajeTabla} where Nombre = @nombre`);
        console.log(response)

        return response.recordset[0];
    }

    getPersonajeByEdad = async (edad) => {
        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('edad',sql.Int, edad)
            .query(`SELECT * from ${personajeTabla} where Edad = @edad`);
        console.log(response)

        return response.recordset[0];
    }


    createPersonaje = async (personaje) => {
        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('Imagen',sql.VarChar, personaje?.Imagen ?? '')
            .input('Nombre',sql.VarChar, personaje?.Nombre ?? '')
            .input('Edad',sql.Int, personaje?.Edad ?? 0)
            .input('Peso',sql.Int, personaje?.Peso ?? 0)
            .input('Historia',sql.VarChar, personaje?.Historia ?? '')
            .input('Apellido',sql.VarChar, personaje?.Apellido ?? '')
            .query(`INSERT INTO ${personajeTabla}(Imagen, Nombre, Edad, Peso, Historia, Apellido) VALUES (@Imagen, @Nombre, @Edad, @Peso, @Historia, @Apellido)`);
        console.log(response)

        return response.recordset;
    }

    updatePersonajeById = async (id, personaje) => {
        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('id',sql.Int, id)
            .input('Imagen',sql.VarChar, personaje?.Imagen ?? '')
            .input('Nombre',sql.VarChar, personaje?.Nombre ?? '')
            .input('Edad',sql.Int, personaje?.Edad ?? 0)
            .input('Peso',sql.Int, personaje?.Peso ?? 0)
            .input('Historia',sql.VarChar, personaje?.Historia ?? '')
            .input('Apellido',sql.VarChar, personaje?.Apellido ?? '')
            .query(`UPDATE ${personajeTabla} SET Imagen = @Imagen, Nombre = @Nombre, Edad = @Edad, Peso = @Peso, Historia = @Historia, Apellido = @Apellido WHERE idPersonaje = @id`);
        console.log(response)

        return response.recordset;
    }

    deletePersonajeById = async (id) => {
        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('id',sql.Int, id)
            .query(`DELETE FROM ${personajeTabla} WHERE idPersonaje = @id`);
        console.log(response)

        return response.recordset;
    }




}