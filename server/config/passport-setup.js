const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
let mongoose = require('mongoose');
const User = mongoose.model('User');

require('dotenv').config();

passport.use(
	new GoogleStrategy(
		{
			// options for strategy
			callbackURL: 'http://localhost:3000/auth/google/callback',
			clientID: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET
		},
		async (accessToken, refreshToken, profile, done) => {
			const email = profile.emails[0].value;

			// check if user already exists
			const currentUser = await User.findOne({ googleId: profile.id });
			if (currentUser) {
				// already have the user -> return (login)
				return done(null, currentUser);
			} else {
				// register user and return
				console.log('newUSER');

				await new User({ email: email, googleId: profile.id }).save(function(err, user) {
					if (err) {
						return done(JSON.stringify({
							error: 'Kayıt yapılamadı.'
						}));
					}
					return done(null, user);
				});


				// return done(null, null);
			}
		}
	)
);