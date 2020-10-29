import { schoolDef, school } from './school/school.query';
import { classDef, Class } from './class/class.query';
import {userDef, user} from "./user/user.query";

const defs = [
	schoolDef,
	classDef,
  userDef
];

export const QueryDef = defs.length > 0 ? `
	type Query {
		${ defs.join('\n\t\t') }
	}
` : '';

export const Query = defs.length > 0 ? {
	school,
	Class,
  user
} : null;
