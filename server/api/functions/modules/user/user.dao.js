import {Class, User} from "../../../models";
import School from "../../../models/school/school";
import _ from "lodash";
import {ROLE_ADMIN, ROLE_SCHOOL_ADMIN, ROLE_STUDENT, ROLE_TEACHER} from "../../../constants/user-roles";

/**
 * @param inputUser{User}
 * @param contextUser{User}
 * @returns {User}
 */

export async function UserCreate(inputUser, contextUser) {
  const {school, role} = inputUser;

  if (role === ROLE_ADMIN || contextUser.role === ROLE_STUDENT) {
    throw new Error(`Unauthorized transaction`);
  }

  if (contextUser.role === ROLE_SCHOOL_ADMIN && (contextUser.school.toString() !== school || role === ROLE_SCHOOL_ADMIN)) {
    throw new Error(`Unauthorized transaction`);
  }

  if (contextUser.role === ROLE_TEACHER && (contextUser.school.toString() !== school || role !== ROLE_STUDENT)) {
    throw new Error(`Unauthorized transaction`);
  }

  const findSchool = await School.findById(school);
  if (!findSchool) {
    throw new Error('School not found.');
  }

  const userModel = new User({...inputUser, school: findSchool});
  if (!userModel) {
    throw new Error(`Can't create new user.`);
  }

  const saveUser = await userModel.save();
  if (!saveUser) {
    throw new Error(`Can't save new user.`);
  }

  return saveUser;
}

/**
 * @param id{number}
 * @param contextUser{User}
 * @returns {User}
 */
export async function UserGet(id, contextUser) {
  const findUser = await User.findById(id).populate('school');

  await checkAuthorization(findUser, contextUser);

  return findUser;
}

/**
 * @param inputUser{User}
 * @param contextUser{User}
 * @returns {User}
 */
export async function UserUpdate(inputUser, contextUser) {
  const updatableFields = _.pick(inputUser, ['id', 'name', 'lastName', 'phone']);
  const {id} = updatableFields;

  const findUser = await User.findById(id);

  await checkAuthorization(findUser, contextUser);

  const userModel = await User.findByIdAndUpdate(id, Object.assign(findUser, updatableFields), {new: true}).populate('school');

  if (!userModel) {
    throw new Error(`User to update '${id}' failed.`);
  }

  return userModel;
}

/**
 * @param user{User}
 * @returns [Class]
 */
async function getUserClasses(user) {
  return Class.find({
    school: user.school,
    $or: [{teachers: {$in: user.id}}, {students: {$in: user.id}}]
  });
}

/**
 * @param user{User}
 * @returns [User]
 */
async function getUserTeachers(user) {
  const userClasses = await getUserClasses(user);
  const userTeachers = userClasses.map(_class => _class.teachers).flat(1);
  return User.find({
    school: user.school,
    role: ROLE_TEACHER,
    _id: {$in: userTeachers}
  }).lean();
}

/**
 * @param user{User}
 * @returns [User]
 */
async function getUserStudents(user) {
  const userClasses = await getUserClasses(user);
  const userStudents = userClasses.map(_class => _class.students).flat(1);
  return User.find({
    school: user.school,
    role: ROLE_STUDENT,
    _id: {$in: userStudents}
  }).lean();
}

async function checkAuthorization(findUser, contextUser) {
  if (!findUser) {
    throw new Error(`User not found.`);
  }

  if (contextUser.role === ROLE_SCHOOL_ADMIN && contextUser.school !== findUser.school) {
    throw new Error(`Unauthorized transaction.`);
  }

  if (contextUser.role === ROLE_TEACHER && contextUser.id !== findUser.id && findUser.role !== ROLE_STUDENT) {
    throw new Error(`Unauthorized transaction.`);
  }

  if (contextUser.role === ROLE_TEACHER && findUser.role === ROLE_STUDENT) {
    const userClasses = await getUserClasses(findUser);
    if (!userClasses.some(_class => _class.teachers.includes(contextUser.id))) {
      throw new Error(`Unauthorized transaction.`);
    }
  }

  if (contextUser.role === ROLE_STUDENT && contextUser.id !== findUser.id) {
    throw new Error(`Unauthorized transaction.`);
  }
}

/**
 * @param id{number}
 * @param contextUser{User}
 * @returns {User}
 */
export async function UserDelete(id, contextUser) {
  if (contextUser.role !== ROLE_ADMIN) {
    throw new Error(`Unauthorized transaction`);
  }

  const checkClasses = await Class.find({
    $or: [{teachers: {$in: id}}, {students: {$in: id}}]
  }).lean();

  if (checkClasses.length) {
    throw new Error('There are classes belonging to the user. You cannot delete the user.');
  }

  const userModel = await User.findByIdAndRemove(id).populate('school');

  if (!userModel) {
    throw new Error(`Can't delete user '${id}'.`);
  }

  return userModel;
}
