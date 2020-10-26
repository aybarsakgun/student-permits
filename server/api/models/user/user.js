import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import { USER_ROLES } from '../../constants/user-roles';

const secret = process.env.JWT_SECRET;

/** User mongoose schema */
const UserSchema = new Schema({
	salt: {
		type: String,
		select: false
	},
	hash: {
		type: String,
		select: false
	},
	username: {
		type: String,
		lowercase: true,
		required: [true, 'User username can\'t be blank']
	},
	name: {
		type: String,
		required: [true, 'User name can\'t be blank']
	},
	lastName: {
		type: String,
		required: [true, 'User last name can\'t be blank']
	},
	email: {
		type: String,
		unique: true,
		lowercase: true,
		required: [true, 'User email can\'t be blank'],
		index: true,
		match: [
			/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
			'is invalid'
		]
	},
	googleId: {
		type: String,
		unique: true,
		index: true,
		default: null,
	},
	phone: {
		type: String,
		required: [true, 'User phone can\'t be blank']
	},
	role: {
		type: String,
		enum: USER_ROLES,
		required: [true, 'User role can\'t be blank'],
	}
},
{
	collection: 'Users',
	timestamps: true,
	toObject: {
		virtuals: true
	},
	toJSON: {
		virtuals: true
	}
});

/** Add unique validator plugin to User schema. */
UserSchema.plugin(uniqueValidator, { message: 'is already taken' });

/**
 * Update user password.
 * @param {string} password user to set.
 * @returns (void) It not returns none.
 */
UserSchema.methods.setPassword = function(password) {
	this.salt = crypto.randomBytes(16).toString('hex');
	this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
}

/**
 * Check that a password is valid to a user.
 * @param {string} password to validate.
 * @returns (boolean) true if password is valid, else returns false.
 */
UserSchema.methods.validatePassword = function(password) {
	const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
	return this.hash === hash;
}

/**
 * Generate JSON Web Token to a user.
 * @returns (string) user token.
 */
UserSchema.methods.generateJWT = function() {
	const today = new Date();
	const exp = new Date(today);
	exp.setDate(today.getDate() + 14);
	return jwt.sign({
		id: this.id,
		exp: parseInt(exp.getTime() / 1000)
	}, secret);
}

/**
 * References:
 * http://thecodebarbarian.com/mongoose-virtual-populate
 * https://mongoosejs.com/docs/4.x/docs/guide.html
 */
UserSchema.virtual('teacherClasses', {
	ref: 'Class',
	localField: '_id',
	foreignField: 'teachers'
});

UserSchema.virtual('studentClasses', {
	ref: 'Class',
	localField: '_id',
	foreignField: 'students'
});

UserSchema.virtual('students', {
	ref: 'User',
	localField: '_id',
	foreignField: 'user'
});

UserSchema.virtual('teachers', {
	ref: 'User',
	localField: '_id',
	foreignField: 'user'
});

/** Set User schema to a model called User */
export default mongoose.model('User', UserSchema);