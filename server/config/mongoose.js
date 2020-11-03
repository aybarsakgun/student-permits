import bluebird from 'bluebird';
import mongoose from 'mongoose';

mongoose.Promise = bluebird;

mongoose.connect(process.env.MONGODB_URI, {
	useNewUrlParser: true,
	useFindAndModify: false,
	useUnifiedTopology: true,
	useCreateIndex: true
}, err => {
	if (!err) return console.info('Connection to database successfully.');
	console.error('[ERROR] Cannot connect to database:', err);
	process.exit();
});
