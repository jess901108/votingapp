
var Vote = require('../models/vote');

module.exports = function(app,passport){
    // tested error routes
    app.get('/error',function(req,res){
        res.render('error');
    });
    
    // Home
    app.get('/',function(req,res){
        Vote.find({},function(err,data){
        if (err) throw err;
        res.render('index',{polls: data});
        });
    });
    
    // Github auth
    app.get('/auth/github',passport.authenticate('github'));
    app.get('/auth/github/callback',passport.authenticate('github', {
			successRedirect: '/',
			failureRedirect: '/error'
		}));
		
    // Creat poll
    app.route('/create/:githubId')
       .get(function(req,res){
           res.render('createPoll');
       })
       .post(function(req,res){
           var github = req.params.githubId;
           var vote = new Vote;
           vote.githubId = github;
           var options = [];
           var optionsGet = req.body.options.split(',');
           vote.pollName = req.body.pollName;
           
           for (var i=0;i<optionsGet.length;i++){
          var colorObj = colorGenerator();
          options.push({"option":optionsGet[i],"votes":0, "color":colorObj.color, "hover":colorObj.hover});
      }
      
      vote.options = options;
      vote.save(function(err,doc){
          if (err) throw err;
          res.redirect('/');
      });
           
       });
    
    // logout
    app.get('/logout',function(req, res) {
        req.logout();
        res.redirect('/');
    });
    
    // myPolls list
    app.get('/myPolls/:githubId',authentication,function(req, res) {
        Vote.find({'githubId':req.params.githubId},function(err,doc){
            if (err) throw err;
            res.render('myPolls',{myPolls:doc});
        });
    });

   
    
// specific poll page
app.route('/poll/:id')
    .get(function(req,res){
        var id = req.params.id;
        Vote.findOne({_id:id},function(err,doc){
            var owner = false;
            if (err) throw err;
            if (req.user && (req.user.githubId == doc.githubId)){
                owner = true;
            }
            res.render('poll',{poll:doc,isOwner:owner});
        });
    })
    .post(function(req,res){
        console.log(req.body.selectPicker);
        if (req.body.selectPicker == "add"){
            console.log(req.body.addOption);
        }
        Vote.findOne({_id:req.params.id},function(err,doc){
           if (err) throw err;
           var vote = doc;
           if (req.body.selectPicker == "add"){
               var newVal = req.body.addOption;
               var colorobj = colorGenerator();
               vote.options.push({'option':newVal,'votes':0,'color':colorobj.color,'hover':colorobj.hover});
           }else {
               vote.options.forEach(function(op){
               if (op.option == req.body.selectPicker){
                   op.votes++;
               }
           });
           }
           var owner = false;
           if (req.user && (req.user.githubId == vote.githubId)){
                owner = true;
            }
           
           vote.save(function(err,data){
               if (err) throw err;
               res.render('poll',{poll:data,isOwner:owner});
           });
        });
    })
    .delete(function(req,res){
        console.log(req.flash);
        Vote.remove({_id:req.params.id},function(err,doc){
            if (err) throw err;
            res.redirect('/');
        });
    });

};



// --------Helper function-----------

// colorGenerator
function colorGenerator(){
   var r = Math.floor(Math.random() * 200);
   var g = Math.floor(Math.random() * 200);
   var b = Math.floor(Math.random() * 200);
var color = 'rgba(' + r + ', ' + g + ', ' + b + ',1)';
var hover = 'rgba(' + r + ',' + g + ',' + b + ',0.6)';

return {"color":color,"hover":hover};
 }

// Check Login
function authentication(req,res,next){
    if (req.isAuthenticated()) {
        console.log(req.user);
			return next();
		} else {
			res.redirect('/');
		}
    
}