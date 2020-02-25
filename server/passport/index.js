const passport = require('passport');
const LocalStrategy = require('./localStrategy');
const User = require('../database/models/User');

passport.serializeUser((user, done) => {
	console.log(`🌎  ==> Logging in ${user.firstName} ${user.lastName}`);
	done(null, { _id: user._id });
})

passport.deserializeUser((id, done) => {
	User.findOne({ _id: id }, 'username', (err, user) => {
		console.log(`🌎  ==> Logging out...`);
		done(null, user);
	}
	)
})

passport.use(LocalStrategy);

module.exports = passport;
