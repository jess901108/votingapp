// Dependencies
var express = require('express'),
path = require('path'),
bodyParser = require('body-parser'),
exphbs = require('express-handlebars'),
flash = require('connect-flash'),
methodOverride = require('method-override'),
session = require('express-session'),
passport = require('passport'),
mongoose = require('mongoose'),
routes = require('./routes/index');

// App init
var app = express();
require('dotenv').load();

// Global variables
var port = process.env.PORT || 3000;


// config passport
require('./config/passportGit')(passport);

// Database connect
mongoose.connect("mongodb://fccjess:fccmengjie@ds011872.mlab.com:11872/voting");

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Method override using POST with Delete
app.use(methodOverride('_method'));


// session
app.use(session({
    secret:"secretVoting",
    saveUninitialized: true,
    resave: false
}));


// passport initialization & session
app.use(passport.initialize());
app.use(passport.session());

//connect flash
app.use(flash());


// View engine
app.set('views',path.join(__dirname,'views'));
app.engine('handlebars',exphbs({defaultLayout: 'layout'}));
app.set('view engine','handlebars');

// Set up static files
app.use(express.static(path.join(__dirname,'public')));

// Set up global variables
app.use(function(req,res,next){
    res.locals.user = req.user || null;
    next();
});

// Setup routes
routes(app,passport);


app.listen(port,function(){
    console.log("Server running on port: "+port);
});