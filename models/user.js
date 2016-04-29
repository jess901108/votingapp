var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    twitter: {
        id: String,
        username: String
    },
    pollName: String,
    options: [{
        option:String,
        votes: Number,
        color:String,
        hover:String
    }]
});

module.exports = mongoose.model('User',UserSchema);