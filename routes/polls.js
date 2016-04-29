var express = require('express');
var router = express.Router();
var Vote = require('../models/vote');

router.get('/create',function(req,res){
   res.render('createPoll');
});

router.post('/createPoll',function(req,res){
   
   function colorGenerator(){
   var r = Math.floor(Math.random() * 200);
   var g = Math.floor(Math.random() * 200);
   var b = Math.floor(Math.random() * 200);
var color = 'rgba(' + r + ', ' + g + ', ' + b + ',1)';
var hover = 'rgba(' + r + ',' + g + ',' + b + ',0.6)';

return {"color":color,"hover":hover};
 }
   
   var vote = new Vote;
   vote.pollName = req.body.pollName;
   var options = req.body.options.split(',');

   for (var i=0;i<options.length;i++){
      var colorObj = colorGenerator();
      vote.options.push({"option":options[i],"votes":0, "color":colorObj.color, "hover":colorObj.hover});
   }
   
   vote.save(function(err,data){
      if (err) throw err;
      // console.log(data);
      res.redirect('/');
   });
});

router.post('/:id',function(req,res){
   Vote.findOne({_id:req.params.id},function(err,doc){
      if (err) throw err;
      doc.options.forEach(function(op){
         if (op.option == req.body.selectPicker){
            op.votes++;
         }
      });
      
      // console.log(doc);
     doc.save(function(err,data){
        if (err) throw err;
       
        res.render('poll',{data:data});
     });
   });
});

router.delete('/:id',function(req,res){
   Vote.remove({_id:req.params.id},function(err,data){
      res.json(err? "err" : "ok");
      res.redirect('/');
   });
});

router.get('/:id',function(req,res){
   Vote.findOne({_id: req.params.id},function(err,doc){
       if (err) throw err;
       res.render('poll',{data:doc});
      //  console.log(doc);
   }); 
});



module.exports = router;