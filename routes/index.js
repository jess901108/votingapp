var express = require('express');
var router = express.Router();
var Vote = require('../models/vote');

router.get('/',function(req,res){
    Vote.find({},function(err,data){
        if (err) throw err;
        res.render('index',{votes: data});
    });
    
});

module.exports = router;