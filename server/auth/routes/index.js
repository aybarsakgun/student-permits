import DDOS from 'ddos';
import {Router} from 'express';
import passport from 'passport';
import {authenticate} from "../../api/functions/authentication";

const router = Router();

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
    session: false
  }), (req, res) => {
    res.redirect(`${process.env.BASE_URL}:${process.env.CLIENT_PORT}/auth/sign-in?accessToken=` + req.user.generateJWT());
  }
);

router.get('/google/fail', (req, res) => {
  res.send({error: 'sisteme kayıtın yok.'});
});

export default router;
