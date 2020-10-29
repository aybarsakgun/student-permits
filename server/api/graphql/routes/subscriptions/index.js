import {schoolCreated, schoolCreatedDef} from './school/school.subscription';
import {classCreated, classCreatedDef} from './class/class.subscription';
import {userCreated, userCreatedDef} from "./user/user.subscription";

const defs = [
  userCreatedDef,
	schoolCreatedDef,
	classCreatedDef
];

export const SubscriptionDef = defs.length > 0 ? `
	type Subscription {
		${ defs.join('\n\t\t') }
	}
` : '';

export const Subscription = defs.length > 0 ? {
  userCreated,
	schoolCreated,
	classCreated
} : null;
