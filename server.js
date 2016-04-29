// Dependencies
var express = require('express'),
path = require('path'),
bodyParser = require('body-parser'),
exphbs = require('express-handlebars'),
flash = require('connect-flash'),
session = require('express-session'),
passport = require('passport'),
mongoose = require('mongoose'),
home = require('./routes/index'),
polls = require('./routes/polls');

// App init
var app = express();

// Global variables
var port = process.env.PORT || 3000;
app.locals.title = "Polls";//testing locals for variable setting.

// Database connect
mongoose.connect('mongodb://votdb1p:votdb1ppsw@ds028679.mlab.com:28679/votingdb');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


// session
app.use(session({
    secret:"secretVoting",
    saveUninitialized: true,
    resave: true
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
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

// Setup routes
app.use('/',home);
app.use('/polls',polls);


app.listen(port,function(){
    console.log("Server running on port: "+port);
});