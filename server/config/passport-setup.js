import passport from 'passport';
import passportGoogle from 'passport-google-oauth20';
import User from '../api/models/user/user';

require('dotenv').config();

const checkUser = (user) => {
  if (!user) {
    throw new Error('The e-mail address you signed in is not registered in our system.');
  }
  return true;
};

passport.use(
  new passportGoogle.Strategy({
      callbackURL: 'http://127.0.0.1:3000/auth/google/callback',
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        const email = profile.emails[0].value;
        const user = await User.findOne({email: email});
        if (checkUser(user)) {
          done(null, user);
        }
      } catch (error) {
        done(error);
      }
    })
);
