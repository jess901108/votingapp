

var GitHubStrategy = require('passport-github').Strategy;
var User = require('../models/githubUsers');

module.exports = function (passport) {
	passport.serializeUser(function (user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function (id, done) {
		User.findById(id, function (err, user) {
			done(err, user);
		});
	});

	passport.use(new GitHubStrategy({
		clientID: "2bae9390800e501304e3",
		clientSecret: "5c6be3fed1f1ee790b834b0b60f21f43b7f941eb",
		callbackURL: "https://voting-app-jess901108-1.c9users.io/auth/github/callback"
	},
	function (token, refreshToken, profile, done) {
		process.nextTick(function () {
			User.findOne({ githubId: profile.id }, function (err, user) {
				if (err) {
					return done(err);
				}

				if (user) {
					return done(null, user);
				} else {
					var newUser = new User();
					newUser.githubId = profile.id;
					newUser.displayName = profile.displayName;
					newUser.save(function (err) {
						if (err) {
							throw err;
						}

						return done(null, newUser);
					});
				}
			});
		});
	}));
};
