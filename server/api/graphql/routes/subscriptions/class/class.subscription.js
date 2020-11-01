import { CLASS_CREATED } from '../../../../constants/subscriptions';
import pubsub from '../../../../singletons/pubsub';

export const classCreatedDef = `classCreated: Class`;

export const classCreated = {
	resolve: (root, params, context, info) => {
		console.info('[graphql/subscription] classCreated');
		return root ? root.classModel : null;
	},
	subscribe: () => pubsub.asyncIterator(CLASS_CREATED)
};
