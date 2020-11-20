import {school, schoolDef} from './school/school.query';
import {Class, classDef} from './class/class.query';
import {user, userDef} from "./user/user.query";
import {config, configDef} from "./core/config/config.query";

const defs = [
  schoolDef,
  classDef,
  userDef,
  configDef
];

export const QueryDef = defs.length > 0 ? `
	type Query {
		${defs.join('\n\t\t')}
	}
` : '';

export const Query = defs.length > 0 ? {
  school,
  Class,
  user,
  config
} : null;
