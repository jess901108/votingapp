var express = require('express');
var router = express.Router();

router.get('/login',function(req,res){
    res.render('login');
});

router.get('/signup',function(req,res){
    res.render('signup');
});

router.get('/users/logout',function(req,res){
    res.send('you logged out');
});

module.exports = router;