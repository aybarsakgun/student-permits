import jwt from 'jsonwebtoken';

import User from '../models/user/user';

const secret = process.env.JWT_SECRET;

/**
 * @param {string} authorization
 * @returns {Object}
 */
function decryptJWT(authorization) {
	if (!authorization) {
    throw new Error('User token not found.');
  }

	const [ bearer, token ] = authorization.split(' ');
	if (bearer !== 'Bearer') {
    throw new Error('Authorization header malformed.');
  }

	return jwt.verify(token, secret);
}

/**
 * @param {string} authorization
 * @returns {User}
 */
export async function authenticate(authorization) {
	const { id } = decryptJWT(authorization);

	const user = await User.findById(id);
	if (!user) {
    throw new Error('User data from token not found.');
  }

	return user;
}
