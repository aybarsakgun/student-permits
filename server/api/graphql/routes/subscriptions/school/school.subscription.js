import { SCHOOL_CREATED } from '../../../../constants/subscriptions';
import pubsub from '../../../../singletons/pubsub';

export const schoolCreatedDef = `schoolCreated: School`;

export const schoolCreated = {
	resolve: (root, params, context, info) => {
		console.info('[graphql/client/subscription] schoolCreated');
		return root ? root.schoolModel : null;
	},
	subscribe: () => pubsub.asyncIterator(SCHOOL_CREATED)
};
