import { schoolDef, school } from './school/school.query';
import { classDef, Class } from './class/class.query';

const defs = [
	schoolDef,
	classDef
];

export const QueryDef = defs.length > 0 ? `
	type Query {
		${ defs.join('\n\t\t') }
	}
` : '';

export const Query = defs.length > 0 ? {
	school,
	Class
} : null;