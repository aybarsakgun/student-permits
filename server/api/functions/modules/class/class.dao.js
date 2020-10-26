import Class from '../../../models/class/class';
import School from '../../../models/school/school';
import User from '../../../models/user/user';
import { ROLE_ADMIN, ROLE_STUDENT, ROLE_TEACHER } from '../../../constants/user-roles';

/**
 * @param _class{Class}
 * @returns {Class}
 */
export async function ClassCreate(_class) {
	const {school, teachers, students} = _class;
	if (!await School.findById(school)) {
		throw new Error('School not found.');
	}
	const foundTeachers = await User.find({
		role: ROLE_TEACHER
	}).where('_id').in(teachers).exec();
	const foundStudents = await User.find({
		role: ROLE_STUDENT
	}).where('_id').in(students).exec();
	const classModel = new Class({..._class, teachers: foundTeachers, students: foundStudents});
	if (!classModel) {
		throw new Error(`Can't create new class.`);
	}
	const saveClass = await classModel.save();
	if (!saveClass) {
		throw new Error(`Can't save new class.`);
	}
	return saveClass;
}

/**
 * @param id{number} class to get it data.
 * @returns {Class} data.
 */
export async function ClassGet(id) {
	const classModel = await Class.findById(id).populate(['school', 'teachers', 'students']);
	if (!classModel){
		throw new Error(`Class '${ id }' not found.`);
	}
	return classModel;
}

/**
 * @param _class{Class}
 * @param user{User}
 * @returns {Class}
 */
export async function ClassUpdate(_class, user) {
	const { id, school, teachers, students } = _class;
	if (school && !await School.findById(school)) {
		throw new Error('School not found.');
	}
	const foundTeachers = await User.find({
		role: ROLE_TEACHER
	}, [{'_id': 1}]).where('_id').in(teachers).exec();
	const foundStudents = await User.find({
		role: ROLE_STUDENT
	}, [{'_id': 1}]).where('_id').in(students).exec();
	const classModel = await Class.findByIdAndUpdate(id, {
		..._class,
		...(_class.teachers !== undefined && {teachers: foundTeachers}),
		...(_class.students !== undefined && {students: foundStudents}),
	});
	if (!classModel) {
		throw new Error(`Class to update '${ id }' not found.`);
	}
	return Class.findById(id).populate(['school', 'teachers', 'students']);
}



