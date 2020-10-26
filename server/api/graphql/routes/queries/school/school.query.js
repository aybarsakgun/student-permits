import { SchoolGet } from '../../../../functions/modules/school/school.dao';

export const schoolDef = `school(id: ID!): School!`;

export const school = async (root, { id }, context, info) => {
	try {
		return await SchoolGet(id);
	} catch (err) {
		console.error('ERROR: [graphql/client/query] school:', err);
		throw new Error(err);
	} finally {
		console.info('[graphql/client/query] school');
	}
};

