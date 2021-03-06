var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var session = require('express-session');
var passport = require('passport');

var connection = require('./db/connection');
var login = require('./routes/login');
var register = require('./routes/register');
var income = require('./routes/income');
var expense = require('./routes/expense');
var investments = require('./routes/investments');
var home = require('./routes/home');
var charts = require('./routes/charts');

require('./auth/setup');

connection.connect();

var app = express();

var sessionConfig = {
    secret: process.env.SECRET || 'super secret key goes here',
    key: 'user',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 30 * 60 * 1000, // 30 minutes
        secure: false
    }
}

app.use(session(sessionConfig));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(passport.initialize());
app.use(passport.session());

// no auth needed
app.use('/login', login);
app.use('/register', register);
app.use('/income', income);
app.use('/expense', expense);
app.use('/investments', investments);
app.use('/home', home);
app.use('/charts', charts);

app.get('/loginStatus', function(req, res) {
    res.send(req.isAuthenticated());
})

// the following routes require authentication
app.use('/private', ensureAuthenticated);

app.get('/private/secretInfo', function(req, res) {
    console.log('Sending secret info');
    res.send('This is very secret!');
});

function ensureAuthenticated(req, res, next) {
    console.log('Ensuring the user is authenticated');
    if (req.isAuthenticated()) {
        next();
    } else {
        res.sendStatus(401);
    }
}

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/views/index.html'));
});

var server = app.listen(3000, function() {
    console.log('Listening on port', server.address().port);
});
