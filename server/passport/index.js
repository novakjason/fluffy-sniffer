const passport = require('passport');
const LocalStrategy = require('./localStrategy');
const User = require('../database/models/User');

passport.serializeUser((user, done) => {
	console.log('🌎  ==> SERIALIZE USER: ' + user.username);
	console.log('🌎  ==> ');
	done(null, { _id: user._id });
})

passport.deserializeUser((id, done) => {
	User.findOne( { _id: id }, 'username', (err, user) => {
			console.log('🌎  ==> DESERIALIZE USER: ' + user.username);
			console.log('🌎  ==> ');
			done(null, user);
		}
	)
})

passport.use(LocalStrategy);

module.exports = passport;
