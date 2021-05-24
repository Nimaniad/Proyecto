// Script de conexión de la base de datos
const mysql = require('mysql');
const { promisify } = require('util');
const { database } = require('./keys');

const pool = mysql.createPool(database);

// Conexion con la Base de Datos
pool.getConnection((err, conection) => {
    // Si fallara
    if (err) {
        if (err.code === 'PROTOCON_CONNECTION_LOST') {
            console.error('DATABASE CONECTION WAS CLOSED');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('DATABASE HAS TO MANY CONECTIONS');
        }
        if (err.code === 'ECONNREFUSEDD') {
            console.error('DATABASE CONECTION REFUSED');
        }
    }

    // Si conecta correctamente
    if (conection) conection.release();
    console.log('DATABASE CONNECTED');
    return;
});

// Pool Query con Promisify
pool.query = promisify(pool.query);

module.exports = pool;