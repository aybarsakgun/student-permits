import passport from 'passport';
import passportGoogle from 'passport-google-oauth20';
import User from '../api/models/user/user';

require('dotenv').config();

passport.use(
  new passportGoogle.Strategy({
      callbackURL: process.env.DEV_ENV === 'true' ? `${ process.env.BASE_URL }:${ process.env.PORT }/auth/google/callback` : `${ process.env.BASE_URL }/auth/google/callback`,
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      proxy: true
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        const email = profile.emails[0].value;
        const user = await User.findOne({email: email});
        done(null, user);
      } catch (error) {
        done(error);
      }
    })
);
