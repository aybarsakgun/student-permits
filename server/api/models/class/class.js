import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const ClassSchema = new Schema({
		name: {
			type: String,
			unique: true,
			required: [true, 'Class name can\'t be blank'],
		},
		school: {
			type: Schema.Types.ObjectId,
			required: [true, 'Class school can\'t be blank'],
			ref: 'School',
			index: true,
		},
		teachers: [{
			type: Schema.Types.ObjectId,
			ref: 'User',
			index: true,
		}],
		students: [{
			type: Schema.Types.ObjectId,
			ref: 'User',
			index: true,
		}]
	},
	{
		collection: 'Classes',
		timestamps: true,
	});

// const autoPopulateTeachers = function(next) {
// 	this.populate('teachers');
// 	next();
// };
//
// const autoPopulateStudents = function(next) {
// 	this.populate('students');
// 	next();
// };
//
// const autoPopulateSchool = function(next) {
// 	this.populate('school');
// 	next();
// };

// ClassSchema.pre('findOne', autoPopulateSchool).pre('find', autoPopulateSchool);
// ClassSchema.pre('findOne', autoPopulateTeachers).pre('find', autoPopulateTeachers);
// ClassSchema.pre('findOne', autoPopulateStudents).pre('find', autoPopulateStudents);

// ClassSchema.post('save', function(_class, next) {
// 	_class.populate('school').populate('teachers').populate('students').execPopulate().then(function() {
// 		next();
// 	});
// });

ClassSchema.plugin(uniqueValidator, { message: 'is already taken' });

export default mongoose.model('Class', ClassSchema);
