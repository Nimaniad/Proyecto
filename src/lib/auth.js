// Módulo para exportar los métodos de verificación de login del usuario
module.exports = {

    // Módulo que detecta si el usuario está logueado
    isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) { //isAuthenticated detecta si el usuario está logueado o no
            return next();
        }
        // Te devuleve al login si intentas acceder a alguna 
        // vista que el usuario necesite estar logueado para verla
        return res.redirect('/signin');
    },

    // Módulo que detecta si el usuario no está logueado
    isNotLoggedIn(req, res, next) {
        if (!req.isAuthenticated()) { //isAuthenticated detecta si el usuario está logueado o no
            return next();
        }
        // te devuelve al perfil si el usuario está logeado
        return res.redirect('/profile');

    }

}