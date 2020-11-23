import DDOS from 'ddos';
import {Router} from 'express';
import passport from 'passport';

const router = Router();
const origin = process.env.DEV_ENV === 'true' ? `${ process.env.BASE_URL }:${ process.env.CLIENT_PORT }` : `${ process.env.BASE_URL }`;

if (process.env.DEV_ENV !== 'true') {
  const ddos = new DDOS();
  router.use(ddos.express);
}

router.get(
  '/google',
  passport.authenticate('google', {
    session: false,
    scope: ["profile", "email"],
    accessType: "offline",
    approvalPrompt: "force"
  })
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: `${origin}/auth/sign-in?accessToken=`
  }), (req, res) => {
    res.redirect(`${origin}/auth/sign-in?accessToken=` + req.user.generateJWT());
  }
);

export default router;
