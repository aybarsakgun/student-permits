import {UserGet} from "../../../../functions/modules/user/user.dao";

export const userDef = `user(id: ID): User!`;

export const user = async (root, { id }, context, info) => {
	try {
	  // const response = await UserGet(id, context.user);
    // return new Promise((resolve) => {
    //   setTimeout(() => resolve(response), 5000)
    // }); // TODO: fake response delay

		return await UserGet(id, context.user);
	} catch (err) {
		console.error('ERROR: [graphql/query] user:', err);
		throw new Error(err);
	} finally {
		console.info('[graphql/query] user');
	}
};

