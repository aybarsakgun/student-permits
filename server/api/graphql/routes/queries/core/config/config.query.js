import {ConfigGet} from "../../../../../functions/modules/core/config/config.dao";

export const configDef = `config: Config!`;

export const config = async (root, params, {user}, info) => {
	try {
    // const response = await ConfigGet(user);
    // return new Promise((resolve) => {
    //   setTimeout(() => resolve(response), 5000)
    // }); // TODO: fake response delay
		return await ConfigGet(user);
	} catch (err) {
		console.error('ERROR: [graphql/query] Config:', err);
		throw new Error(err);
	} finally {
		console.info('[graphql/query] Config');
	}
};

