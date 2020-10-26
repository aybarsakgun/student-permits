import { ClassGet } from '../../../../functions/modules/class/class.dao';

export const classDef = `Class(id: ID!): Class!`;

export const Class = async (root, { id }, context, info) => {
	try {
		return await ClassGet(id);
	} catch (err) {
		console.error('ERROR: [graphql/client/query] Class:', err);
		throw new Error(err);
	} finally {
		console.info('[graphql/client/query] Class');
	}
};

