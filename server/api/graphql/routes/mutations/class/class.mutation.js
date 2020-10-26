import { ClassCreate, ClassUpdate } from '../../../../functions/modules/class/class.dao';
import pubsub from '../../../../singletons/pubsub';
import { CLASS_CREATED, CLASS_UPDATED } from '../../../../constants/subscriptions';

export const classCreateDef = `classCreate(class: ClassInput!): Class!`;

export async function classCreate(root, payload, context, info) {
	try {
		const classModel = await ClassCreate(payload.class);
		pubsub.publish(CLASS_CREATED, { classModel });
		return classModel;
	} catch (err) {
		console.error('ERROR: [graphql/client/mutation] classCreate:', err);
		throw new Error(err);
	} finally {
		console.info('[graphql/client/mutation] classCreate');
	}
}

export const classUpdateDef = `classUpdate(class: ClassInput!): Class!`;

export async function classUpdate(root, payload, context, info) {
	try {
		const classModel = await ClassUpdate(payload.class, context.user);
		pubsub.publish(CLASS_UPDATED, { classModel });
		return classModel;
	} catch (err) {
		console.error('ERROR: [graphql/client/mutation] classUpdate:', err);
		throw new Error(err);
	} finally {
		console.info('[graphql/client/mutation] classUpdate');
	}
}
