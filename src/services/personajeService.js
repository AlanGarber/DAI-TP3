import sql from 'mssql'
import config from '../../db.js'
import 'dotenv/config'

const personajeTabla=process.env.DB_TABLA_PERSONAJE;

export class PersonajeService {

    getAllPersonaje = async () => {
        console.log('This is a function on the service');

        console.log(config);
        const pool = await sql.connect(config);
        const response = await pool.request().query(`SELECT * from ${personajeTabla}`);
        console.log(response)

        return response.recordset;
    }

    createPersonaje = async (personaje) => {
        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('Imagen',sql.VarChar, personaje?.Imagen ?? '')
            .input('Nombre',sql.VarChar, personaje?.Nombre ?? '')
            .input('Edad',sql.int, personaje?.Edad ?? 0)
            .input('Peso',sql.int, personaje?.Peso ?? 0)
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
            .input('Imagen',sql.VarChar, personaje?.Imagen ?? '')
            .input('Nombre',sql.VarChar, personaje?.Nombre ?? '')
            .input('Edad',sql.int, personaje?.Edad ?? 0)
            .input('Peso',sql.int, personaje?.Peso ?? 0)
            .input('Historia',sql.VarChar, personaje?.Historia ?? '')
            .input('Apellido',sql.VarChar, personaje?.Apellido ?? '')
            .query(`UPDATE Personajes SET Imagen = @Imagen, Nombre = @Nombre, Edad = @Edad, Peso = @Peso, Historia = @Historia, Apellido = @Apellido WHERE id = @id`);
        console.log(response)

        return response.recordset;
    }

    deletePersonajeById = async (id) => {
        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('id',sql.Int, id)
            .query(`DELETE FROM ${personajeTabla} WHERE id = @id`);
        console.log(response)

        return response.recordset;
    }




}