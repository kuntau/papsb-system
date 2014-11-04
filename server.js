// ======================================
// server.js
// ======================================

    var express        = require('express');
    var app            = express();
    var mongoose       = require('mongoose');
    var passport       = require('passport');
    var flash          = require('connect-flash');
    var port           = process.env.PORT || 3000;

    // new express 4 middleware
    var methodOverride = require('method-override');
    var bodyParser     = require('body-parser');
    var cookieParser   = require('cookie-parser');
    var session        = require('express-session');
    var logger         = require('morgan');

    // database connection
    var database       = require('./config/db');
    mongoose.connect(database.url);

    // passport config
    require('./config/passport')(passport);

    // express setup
    app.use(express.static(__dirname + '/public'));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(methodOverride());

    // passport middleware setup
    app.use(cookieParser())
    app.use(session({ secret: 'papsbportalsecret',
                      resave: true,
                      saveUninitialized: true }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());

// ======================================
// routes
// ======================================

    require('./app/routes')(app, passport);

// ======================================
// run the server
// ======================================
    app.listen(port);
    console.log('app listening on http://localhost:3000/');
