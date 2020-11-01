import {SchoolCreate, SchoolDelete, SchoolUpdate} from '../../../../functions/modules/school/school.dao';
import pubsub from '../../../../singletons/pubsub';
import {SCHOOL_CREATED, SCHOOL_DELETED, SCHOOL_UPDATED} from '../../../../constants/subscriptions';

export const schoolCreateDef = `schoolCreate(school: SchoolInput!): School!`;

export async function schoolCreate(root, { school }, context, info) {
	try {
		const schoolModel = await SchoolCreate(school, context.user);
		pubsub.publish(SCHOOL_CREATED, { schoolModel });
		return schoolModel;
	} catch (err) {
		console.error('ERROR: [graphql/mutation] schoolCreate:', err);
		throw new Error(err);
	} finally {
		console.info('[graphql/mutation] schoolCreate');
	}
}

export const schoolUpdateDef = `schoolUpdate(school: SchoolInput!): School!`;

export async function schoolUpdate(root, { school }, context, info) {
  try {
    const schoolModel = await SchoolUpdate(school, context.user);
    pubsub.publish(SCHOOL_UPDATED, { schoolModel });
    return schoolModel;
  } catch (err) {
    console.error('ERROR: [graphql/mutation] schoolUpdate:', err);
    throw new Error(err);
  } finally {
    console.info('[graphql/mutation] schoolUpdate');
  }
}

export const schoolDeleteDef = `schoolDelete(school: ID!): School!`;

export async function schoolDelete(root, { school }, context, info) {
  try {
    const schoolModel = await SchoolDelete(school, context.user);
    pubsub.publish(SCHOOL_DELETED, { schoolModel });
    return schoolModel;
  } catch (err) {
    console.error('ERROR: [graphql/mutation] schoolDelete:', err);
    throw new Error(err);
  } finally {
    console.info('[graphql/mutation] schoolDelete');
  }
}

