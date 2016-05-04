
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Username = new Schema({
	githubId:String,
	displayName:String
});

module.exports = mongoose.model('Username', Username);
