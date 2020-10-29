import School from '../../../models/school/school';
import {ROLE_ADMIN, ROLE_SCHOOL_ADMIN, ROLE_STUDENT, ROLE_TEACHER} from "../../../constants/user-roles";

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
 * @param id{number} school to get it data.
 * @returns {School} data.
 */
export async function SchoolGet(id) {
	const schoolModel = await School.findById(id);
	if (!schoolModel){
		throw new Error(`School '${ id }' not found.`);
	}
	return schoolModel;
}



