import { SchoolCreate } from '../../../../functions/modules/school/school.dao';
import pubsub from '../../../../singletons/pubsub';
import { SCHOOL_CREATED } from '../../../../constants/subscriptions';

export const schoolCreateDef = `schoolCreate(school: SchoolInput!): School!`;

export async function schoolCreate(root, { school }, context, info) {
	try {
		const schoolModel = await SchoolCreate(school);
		pubsub.publish(SCHOOL_CREATED, { schoolModel });
		return schoolModel;
	} catch (err) {
		console.error('ERROR: [graphql/client/mutation] schoolCreate:', err);
		throw new Error(err);
	} finally {
		console.info('[graphql/client/mutation] schoolCreate');
	}
}
