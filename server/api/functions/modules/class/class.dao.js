import Class from '../../../models/class/class';
import School from '../../../models/school/school';
import User from '../../../models/user/user';
import {ROLE_SCHOOL_ADMIN, ROLE_STUDENT, ROLE_TEACHER} from '../../../constants/user-roles';
import _ from "lodash";

/**
 * @param inputClass{Class}
 * @param contextUser{User}
 * @returns {Class}
 */
export async function ClassCreate(inputClass, contextUser) {
  const {school, teachers, students} = inputClass;

  if (contextUser.role === ROLE_STUDENT) {
    throw new Error(`Unauthorized transaction`);
  }

  const findSchool = await School.findById(school);
  if (!findSchool) {
    throw new Error('School not found.');
  }

  const foundTeachers = await User.find({
    school: school,
    role: ROLE_TEACHER,
    _id: {
      $in: teachers
    }
  }).populate('school');

  const foundStudents = await User.find({
    school: school,
    role: ROLE_STUDENT,
    _id: {
      $in: students
    }
  }).populate('school');

  const classModel = new Class({...inputClass, school: findSchool, teachers: foundTeachers, students: foundStudents});
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
 * @param id{number}
 * @param contextUser{User}
 * @returns {Class}
 */
export async function ClassGet(id, contextUser) {
  const classModel = await Class.findById(id).populate(['school', {
    path: 'teachers',
    populate: 'school'
  }, {path: 'students', populate: 'school'}]);

  if (!classModel) {
    throw new Error(`Class '${id}' not found.`);
  }

  if (contextUser.role === ROLE_SCHOOL_ADMIN && contextUser.school.toString() !== classModel.school.id.toString()) {
    throw new Error(`Unauthorized transaction.`);
  }

  if (contextUser.role === ROLE_TEACHER && !classModel.teachers.find(teacher => teacher.id.toString() === contextUser.id.toString())) {
    throw new Error(`Unauthorized transaction.`);
  }

  if (contextUser.role === ROLE_STUDENT && !classModel.students.find(student => student.id.toString() === contextUser.id.toString())) {
    throw new Error(`Unauthorized transaction.`);
  }

  return classModel;
}

/**
 * @param inputClass{Class}
 * @param contextUser{User}
 * @returns {Class}
 */
export async function ClassUpdate(inputClass, contextUser) {
  const updatableFields = _.pick(inputClass, ['id', 'name', 'teachers', 'students']);

  const {id, name, teachers, students} = updatableFields;

  const findClass = await Class.findById(id);

  if (!findClass) {
    throw new Error(`Class '${id}' not found.`);
  }

  if (contextUser.role === ROLE_SCHOOL_ADMIN && contextUser.school !== findClass.school) {
    throw new Error(`Unauthorized transaction.`);
  }

  if (contextUser.role === ROLE_TEACHER && !findClass.teachers.includes(contextUser.id)) {
    throw new Error(`Unauthorized transaction.`);
  }

  if (contextUser.role === ROLE_STUDENT) {
    throw new Error(`Unauthorized transaction.`);
  }

  const foundTeachers = await User.find({
    school: findClass.school,
    role: ROLE_TEACHER,
    _id: {
      $in: teachers
    }
  }).select('_id');

  const foundStudents = await User.find({
    school: findClass.school,
    role: ROLE_STUDENT,
    _id: {
      $in: students
    }
  }).select('_id');

  const classModel = await Class.findByIdAndUpdate(id, {
    ...(name !== undefined && {name: name}),
    ...(teachers !== undefined && {teachers: foundTeachers}),
    ...(students !== undefined && {students: foundStudents}),
  }, {new: true}).populate(['school', {path: 'teachers', populate: 'school'}, {path: 'students', populate: 'school'}]);

  if (!classModel) {
    throw new Error(`Class to update '${id}' not found.`);
  }

  return classModel;
}

/**
 * @param id{number}
 * @param contextUser{User}
 * @returns {Class}
 */
export async function ClassDelete(id, contextUser) {
  if (contextUser.role === ROLE_STUDENT) {
    throw new Error(`Unauthorized transaction`);
  }

  const findClass = await Class.findById(id);

  if (!findClass) {
    throw new Error(`Class '${id}' not found.`);
  }

  if (contextUser.role === ROLE_SCHOOL_ADMIN && findClass.school.toString() !== contextUser.school.toString()) {
    throw new Error(`Unauthorized transaction1`);
  }

  if (contextUser.role === ROLE_TEACHER && !findClass.teachers.includes(contextUser.id)) {
    throw new Error(`Unauthorized transaction2`);
  }

  const classModel = await Class.findByIdAndRemove(id).populate(['school', {
    path: 'teachers',
    populate: 'school'
  }, {path: 'students', populate: 'school'}]);

  if (!classModel) {
    throw new Error(`Can't delete class '${id}'.`);
  }

  return classModel;
}



