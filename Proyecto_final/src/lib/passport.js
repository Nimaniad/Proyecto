// Script para los métodos de autentificación usados en el archivo authentication.js
const passport = require('passport');
const LocalStrategy = require('passport-local');

const pool = require('../database');
const helpers = require('../lib/helpers');

// Definir la autentificación con local.signin,  
// recibe los datos y los compara con los guardados
// en la base de datos
passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, username, password, done) => {
    console.log(req.body);
    const rows = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    if (rows.length > 0) {
        const user = rows[0];
        // Validar que la contraseña sea igual
        const validPassword = await helpers.matchPassword(password, user.password)
            // Mensajes para el usuario
        if (validPassword) {
            done(null, user, req.flash('success', 'Welcome ' + user.username));
        } else {
            done(null, false, req.flash('message', 'Incorrect Password'));
        }
    } else {
        return done(null, false, req.flash('message', 'Username not found'));
    }
}));

// Recoge los datos del usuario, encripta la contraseña
// y los inserta en la base de datos
passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, username, password, done) => {
    // Datos que almacenará
    const { fullname } = req.body;
    const newUser = {
        username,
        password,
        fullname
    };
    newUser.password = await helpers.encryptPassword(password); // Encriptado de contraseña
    const result = await pool.query('INSERT INTO users SET ?', [newUser]);
    newUser.id = result.insertId; // Añadimos un id al usuario
    return done(null, newUser);


}));

// Para el guardado en las sesiones de express
passport.serializeUser((user, done) => {
    done(null, user.id);

});

// Consulta de los datos del usuario desde su propia sesión
passport.deserializeUser(async(id, done) => {
    const rows = await pool.query('SELECT * FROM users Where id = ?', [id]);
    done(null, rows[0]);
});