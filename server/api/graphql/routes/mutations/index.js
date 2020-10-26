import { schoolCreate, schoolCreateDef } from './school/school.mutation';
import { classCreate, classCreateDef, classUpdate, classUpdateDef } from './class/class.mutation';


const defs = [
	schoolCreateDef,
	classCreateDef,
	classUpdateDef,
];

export const MutationDef = defs.length > 0 ? `
	type Mutation {
		${defs.join('\n\t\t')}
	}
` : '';

export const Mutation = defs.length > 0 ? {
	schoolCreate,
	classCreate,
	classUpdate,
} : null;