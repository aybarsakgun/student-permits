import { ClassGet } from '../../../../functions/modules/class/class.dao';

export const classDef = `Class(id: ID!): Class!`;

export const Class = async (root, { id }, {user}, info) => {
	try {
		return await ClassGet(id, user);
	} catch (err) {
		console.error('ERROR: [graphql/query] Class:', err);
		throw new Error(err);
	} finally {
		console.info('[graphql/query] Class');
	}
};

