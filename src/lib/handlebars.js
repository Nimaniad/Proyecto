// script para la configuración de la biblioteca timeago.js
const { format } = require('timeago.js');

const helpers = {};

// Timeago convierte la fecha de timestamp en una fech amás legible para el usuario
helpers.timeago = (timestamp) => {
    return format(timestamp);
}

module.exports = helpers;