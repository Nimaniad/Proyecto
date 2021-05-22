/* Script de helpers
 * Nos servirá para encriptar las contraseñas usando la libreria
 * bcrypt. También para autenticar que la contraseña que inserte el 
 * ususario sea la misma que hay en la base de datos
 */
const bcrypt = require('bcryptjs');

const helpers = {};

// Encriptador de contraseña
helpers.encryptPassword = async(password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};
// Metodo para comparar la contraseña por usuario guardada en la
// base de datos, con la insertada por el usuario
helpers.matchPassword = async(password, savedPassword) => {
    try {
        return await bcrypt.compare(password, savedPassword);
    } catch (e) {
        console.log(e);
    }
};

module.exports = helpers;