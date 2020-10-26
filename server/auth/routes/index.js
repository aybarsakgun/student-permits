import DDOS from 'ddos';
import { Router } from 'express';
import passport from 'passport';
import { authenticate } from '../../api/functions/authentication';
import jwt from 'jsonwebtoken';

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

// callback url upon successful google authentication
router.get(
	'/google/callback',
	passport.authenticate('google', { session: false }),
	(req, res) => {
		console.log(req.err);
		console.log(req.error);
		// console.log(req.error);
		// console.log(req.user._id);
		// if (req.error) {
		// 	console.log('reqNULL RETURN 500');
		// 	console.log(req.error);
		// 	return res.sendStatus(500);
		// }
		const today = new Date();
		const exp = new Date(today);
		exp.setDate(today.getDate() + 14);
		return jwt.sign({
			id: req.user._id,
			exp: parseInt(exp.getTime() / 1000)
		}, secret);
	}
);

router.get('/google/fail', (req, res) => {
	res.send({error: 'sisteme kayıtın yok.'});
});

// route to check token with postman.
// using middleware to check for authorization header
router.get('/verify', (req, res) => {
	return authenticate(req.token);
});

export default router;
