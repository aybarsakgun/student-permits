import { ApolloServer, gql } from 'apollo-server-express';

import { TypeDef } from './types';
import { QueryDef, Query  } from './queries';
import { MutationDef, Mutation } from './mutations';
import { SubscriptionDef, Subscription } from './subscriptions';
import { authenticate } from '../../functions/authentication';

/**
 * @param {Express} app
 * @param {HttpServer} server
 * @param {string} path
 * @returns {Object}
 */
export function setGraphQLClientAPI(app, server, path) {
	const typeDefs = gql`${ [
		TypeDef,
		QueryDef,
		MutationDef,
		SubscriptionDef
	].join('\n') }`;

	const resolvers = {
		...Query && { Query },
		...Mutation && { Mutation },
		...Subscription && { Subscription }
	};

	/**
	 * @param { req, connection }
	 * @returns {Object}
	 */
	async function context({ req, connection }) {
		if (!req && connection) {
      return null;
    }
		if (!req.headers) {
      throw new Error('Request headers is undefined.');
    }
		const user = await authenticate(req.headers.authorization);
		return { user };
	}

	/**
	 * @returns {Object}
	 */
	const subscriptions = { onConnect: async (connectionParams, webSocket) => {
		const user = await authenticate(connectionParams.authorization);
		return { user };
	}, path };

	/**
	 * @param err
	 * @returns {Error}
	 */
	function formatError(err) {
		console.error('ERROR: [graphql]:', err);
		return err.message || err;
	}

	const apolloServer = new ApolloServer({ typeDefs, resolvers, context, subscriptions, formatError });
	apolloServer.applyMiddleware({ app, path });
	apolloServer.installSubscriptionHandlers(server);

	return {
		graphqlClientPath: apolloServer.graphqlPath,
		graphqlClientSubsPath: apolloServer.subscriptionsPath
	};
}
