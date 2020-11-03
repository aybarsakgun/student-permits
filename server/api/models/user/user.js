import jwt from 'jsonwebtoken';
import mongoose, {Schema} from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import {USER_ROLES} from '../../constants/user-roles';

const secret = process.env.JWT_SECRET;

const UserSchema = new Schema({
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
	phone: {
		type: String,
		required: [true, 'User phone can\'t be blank']
	},
	role: {
		type: String,
		enum: USER_ROLES,
		required: [true, 'User role can\'t be blank'],
	},
  school: {
    type: Schema.Types.ObjectId,
    required: [true, 'Class school can\'t be blank'],
    ref: 'School',
    index: true,
  },
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

UserSchema.plugin(uniqueValidator, { message: 'is already taken' });

/**
 * @returns (string)
 */
UserSchema.methods.generateJWT = function() {
	const today = new Date();
	const exp = new Date(today);
	exp.setDate(today.getDate() + 14);
	return jwt.sign({
		id: this.id,
		exp: parseInt(exp.getTime() / 1000)
	}, secret);
};

// UserSchema.virtual('teacherClasses', {
// 	ref: 'Class',
// 	localField: '_id',
// 	foreignField: 'teachers'
// });
//
// UserSchema.virtual('studentClasses', {
// 	ref: 'Class',
// 	localField: '_id',
// 	foreignField: 'students'
// });
//
// UserSchema.virtual('students', {
// 	ref: 'User',
// 	localField: '_id',
// 	foreignField: 'user'
// });
//
// UserSchema.virtual('teachers', {
// 	ref: 'User',
// 	localField: '_id',
// 	foreignField: 'user'
// });

export default mongoose.model('User', UserSchema);
