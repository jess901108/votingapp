// Dependencies
var express = require('express'),
path = require('path'),
cookieParser = require('cookie-parser'),
bodyParser = require('body-parser'),
exphbs = require('express-handlebars'),
expressValidator = require('express-validator'),
flash = require('connect-flash'),
session = require('express-session'),
passport = require('passport'),
LocalStrategy = require('passport-local').Strategy,
mongoose = require('mongoose'),
home = require('./routes/index'),
users = require('./routes/users'),
polls = require('./routes/polls');

// App init
var app = express();

// Global variables
var port = process.env.PORT || 3000;



// View engine
app.set('views',path.join(__dirname,'views'));
app.engine('handlebars',exphbs({defaultLayout: 'layout'}));
app.set('view engine','handlebars');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Set up static files
app.use(express.static(path.join(__dirname,'public')));

// Setup routes
app.use('/',home);
app.use('/users',users);
// app.use('/polls',polls);


app.listen(port,function(){
    console.log("Server running on port: "+port);
});