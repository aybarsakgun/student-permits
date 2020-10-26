import User from '../../../models/user/user';

/**
 * @param user{User}
 * @param password{string}
 * @returns boolean default true.
 */
export async function SignUp(user, password) {
	const userModel = new User(user);
	if (!user) {
		throw new Error('Cant create new user.');
	}
	userModel.setPassword(password);
	const saveUser = await userModel.save();
	if (!saveUser) {
		throw new Error('Cant save new user.');
	}
	return true;
}

/**
 * @param email{string}
 * @param password{string}
 * @returns {string}
 */
export async function SignIn(email, password) {
	const userModel = await User.findOne({ email });
	if (!userModel) {
		throw new Error('User not found.');
	}
	if (!userModel.validatePassword(password)) {
		throw new Error('Password incorrect.');
	}
	return userModel.generateJWT();
}