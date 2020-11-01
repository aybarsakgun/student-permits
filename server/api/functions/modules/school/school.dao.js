import School from '../../../models/school/school';
import {ROLE_ADMIN, ROLE_SCHOOL_ADMIN, ROLE_STUDENT, ROLE_TEACHER} from "../../../constants/user-roles";
import {Class, User} from "../../../models";

/**
 * @param inputSchool{School}
 * @param contextUser{User}
 * @returns {School}
 */
export async function SchoolCreate(inputSchool, contextUser) {
  if (contextUser.role !== ROLE_ADMIN) {
    throw new Error(`Unauthorized transaction`);
  }

	const schoolModel = new School(school);
	if (!schoolModel) {
		throw new Error(`Can't create new school.`);
	}

	const saveSchool = await schoolModel.save();
	if (!saveSchool) {
		throw new Error(`Can't save new school.`);
	}

	return saveSchool;
}

/**
 * @param inputSchool{School}
 * @param contextUser{User}
 * @returns {School}
 */
export async function SchoolUpdate(inputSchool, contextUser) {
  if (contextUser.role === ROLE_TEACHER || contextUser.role === ROLE_STUDENT) {
    throw new Error(`Unauthorized transaction1`);
  }

  const {id} = inputSchool;

  if (contextUser.role === ROLE_SCHOOL_ADMIN && contextUser.school.toString() !== id) {
    throw new Error(`Unauthorized transaction`);
  }

  const findSchool = await School.findById(id);

  const schoolModel = await School.findByIdAndUpdate(id, Object.assign(findSchool, inputSchool), {new: true});

  if (!schoolModel) {
    throw new Error(`School to update '${id}' failed.`);
  }

  return schoolModel;
}

/**
 * @param id{number}
 * @returns {School}
 */
export async function SchoolGet(id) {
	const schoolModel = await School.findById(id);
	if (!schoolModel) {
		throw new Error(`School '${ id }' not found.`);
	}
	return schoolModel;
}

/**
 * @param id{number}
 * @param contextUser{User}
 * @returns {School}
 */
export async function SchoolDelete(id, contextUser) {
  if (contextUser.role === ROLE_TEACHER || contextUser.role === ROLE_STUDENT) {
    throw new Error(`Unauthorized transaction`);
  }

  if (contextUser.role === ROLE_SCHOOL_ADMIN && contextUser.school.toString() !== id) {
    throw new Error(`Unauthorized transaction`);
  }

  const checkUsers = await User.find({
    school: id
  }).lean();

  if (checkUsers.length) {
    throw new Error('There are users belonging to the school. You cannot delete the school.');
  }

  const checkClasses = await Class.find({
    school: id
  }).lean();

  if (checkClasses.length) {
    throw new Error('There are classes belonging to the school. You cannot delete the school.');
  }

  const schoolModel = await School.findByIdAndRemove(id);

  if (!schoolModel) {
    throw new Error(`Can't delete school '${ id }'.`);
  }

  return schoolModel;
}



