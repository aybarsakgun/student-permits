import { schoolCreatedDef, schoolCreated } from './school/school.subscription';
import { classCreatedDef, classCreated } from './class/class.subscription';

const defs = [
	schoolCreatedDef,
	classCreatedDef
];

export const SubscriptionDef = defs.length > 0 ? `
	type Subscription {
		${ defs.join('\n\t\t') }
	}
` : '';

export const Subscription = defs.length > 0 ? {
	schoolCreated,
	classCreated
} : null;