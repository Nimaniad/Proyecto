// Reequirimientos
const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const passport = require('passport');

const { database } = require('./keys');


// Inicializaciones
const app = express();
require('./lib/passport');


// Configuracion
// Si hay un puerto libre, lo toma, sino tomará el puerto 4000
app.set('port', process.env.PORT || 4000);

// Establecer donde está la carpeta de las Vistas '/view/
app.set('views', path.join(__dirname, 'views'));

// Configuración de las plantillas de Handlebars
app.engine('.hbs', exphbs({ // Cambio de la extensión de .handlebars a .hbs
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}))
app.set('view engine', '.hbs');


// Middlewares
app.use(session({
    secret: 'nimnimsession',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}));
app.use(flash());
app.use(morgan('dev'));
// Metodo para acptar desde los formularios los datos que nos pasan los usuarios en formatos sencillos (Strings, etc)
app.use(express.urlencoded({ extended: false }));
// Metodo para extender el tipo de variables que podemos recibir por el usuario
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());


// Variables Globales
app.use((req, res, next) => {
    app.locals.success = req.flash('success'); // Variable del mensaje de Success
    app.locals.message = req.flash('message'); // Variable del mensaje de Error
    app.locals.user = req.user;
    next();
})

// Rutas
app.use(require('./routes'));
app.use(require('./routes/authentication'));

// Archivos Públicos
app.use(express.static(path.join(__dirname, 'public')));

// Servidor
app.listen(app.get('port'), () => {
    console.log('PORT: ', app.get('port'));
});