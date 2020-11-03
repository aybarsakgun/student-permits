import DDOS from 'ddos';
import {Router} from 'express';
import passport from 'passport';

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
    // var responseHTML = '<html><head><title>Main</title></head><body></body><script>res = %value%; window.opener.postMessage(res, "*");window.close();</script></html>';
    var responseHTML = '<html><head><meta http-equiv="Content-Security-Policy" script-src=\'unsafe-inline\'><title>Main</title></head><body>'+JSON.stringify({
      user: req.user,
      token: req.user.generateJWT()
    })+'</body><script>setTimeout(() => {window.close();}, 5000);</script></html>';
    console.log(responseHTML);
    responseHTML = responseHTML.replace('%value%', JSON.stringify({
      user: req.user,
      token: req.user.generateJWT()
    }));
    res.status(200).send(responseHTML);
    // res.send(req.user.generateJWT());
  }
);

router.get('/google/fail', (req, res) => {
  res.send({error: 'sisteme kayıtın yok.'});
});

export default router;
