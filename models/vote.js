var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var voteSchema = new Schema({
    githubId : String,
    pollName:String,
    options:[{
        option:String,
        votes:Number,
        color:String,
        hover:String
    }]
});

module.exports = mongoose.model('vote',voteSchema);