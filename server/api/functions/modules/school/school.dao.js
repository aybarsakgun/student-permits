import School from '../../../models/school/school';

/**
 * @param school{School}
 * @returns {School}
 */
export async function SchoolCreate(school) {
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

// import {School as schoolModel} from '../../../models/school';
//
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



