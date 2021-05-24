/* Información de conexión con la base de datos.
 * En caso de querer conectarse con un host de bases de datos
 * solo habría que cambiar estos parámetros a los de conexion de la base hosteada.
 */
module.exports = {

    database: {
        host: 'localhost', // Dirección del host
        user: 'root', // Usuario
        password: '', // Contraseña si fuera necesario
        database: 'web' // Nombre de la base 
    }
}