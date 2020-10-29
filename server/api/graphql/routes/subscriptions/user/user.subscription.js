import {USER_CREATED} from '../../../../constants/subscriptions';
import pubsub from '../../../../singletons/pubsub';

export const userCreatedDef = `userCreated: User`;

export const userCreated = {
	resolve: (root, params, context, info) => {
		console.info('[graphql/client/subscription] userCreated');
		return root ? root.userModel : null;
	},
	subscribe: () => pubsub.asyncIterator(USER_CREATED)
};
