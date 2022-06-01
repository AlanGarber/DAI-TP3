import sql from 'mssql'
import config from '../../db.js'
import 'dotenv/config'
import { parse } from 'dotenv';

const personajeTabla=process.env.DB_TABLA_PERSONAJE;
const personajeXPeliculaTabla=process.env.DB_TABLA_PxP;
const peliculaTabla=process.env.DB_TABLA_PELICULA;

export class PersonajeService {

    getAllCharacter = async (nombre,edad,movie,peso) => {
        console.log('This is a function on the service');
        let where=false;
        let QueryBase=`SELECT DISTINCT p.idPersonaje, p.Nombre, p.Imagen FROM ${personajeTabla} p`;
        let querySub=``

        if(nombre){
            if(where){
                querySub+=" AND Nombre=@nombre";
            }else{
                where=true;
                querySub+=" Nombre=@nombre";
            }
        }
        if(edad){
            if(where){
                querySub+=" AND Edad=@edad";
            }else{
                where=true;
                querySub+=" Edad=@edad"
            }
        }
        if(peso){
            if(where){
                querySub+=" AND Peso=@peso";
            }else{
                where=true;
                querySub+=" Peso=@peso"
            }
        }
        if(movie){
            if(where){
                querySub=`, ${personajeXPeliculaTabla} pp WHERE p.IdPersonaje=pp.IdPersonaje AND`+querySub;
            }else{
                querySub=`, ${personajeXPeliculaTabla} pp WHERE p.IdPersonaje=pp.IdPersonaje `+querySub;
            }
            
            querySub+= " AND pp.idPelicula=@movie"
        }
        if(where && !movie){
            QueryBase+=" WHERE" +querySub;
        }else{
            QueryBase+=querySub
        }
        console.log(QueryBase)
        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('nombre',sql.VarChar, nombre)
            .input('edad',sql.Int, edad)
            .input('peso',sql.Int, peso)
            .input('movie',sql.Int, movie)
            .query(QueryBase);

        return response.recordset;
    }

    getCharacterById = async (id) => {
        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const response = await pool.request()
                .input('id',sql.Int, id)
                .query(`SELECT m.* FROM ${peliculaTabla} m, ${personajeTabla} p, ${personajeXPeliculaTabla} pp WHERE m.idPelicula = pp.idPelicula and p.idPersonaje = pp.idPersonaje and p.idPersonaje=@id`);
        let helper = await pool.request()
                .input('id',sql.Int, id)
                .query(`SELECT p.* FROM ${personajeTabla} p WHERE p.idPersonaje=@id`);
        
        console.log(response)
        helper.recordset[0].movies=response.recordset;
        return helper.recordset[0];
    }

    createCharacter = async (personaje) => {
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

    updateCharacterById = async (id, personaje) => {
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

    deleteCharacterById = async (id) => {
        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('id',sql.Int, id)
            .query(`DELETE FROM ${personajeTabla} WHERE idPersonaje = @id`);
        console.log(response)

        return response.recordset;
    }




}