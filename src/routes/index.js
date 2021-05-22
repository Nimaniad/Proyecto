// Definición de la ruta principal al iniciar el servidor
const express = require('express');
const router = express.Router();

// Renderiza la vista index principal en la ruta '/'
router.get('/', (req, res) => {
    res.render('index');
});

// Lo exportamos
module.exports = router;