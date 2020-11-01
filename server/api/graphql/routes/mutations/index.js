import {
  schoolCreate,
  schoolCreateDef,
  schoolDelete,
  schoolDeleteDef,
  schoolUpdate,
  schoolUpdateDef
} from './school/school.mutation';
import {
  classCreate,
  classCreateDef,
  classDelete,
  classDeleteDef,
  classUpdate,
  classUpdateDef
} from './class/class.mutation';
import {userCreate, userCreateDef, userDelete, userDeleteDef, userUpdate, userUpdateDef} from "./user/user.mutation";


const defs = [
  schoolCreateDef,
  schoolUpdateDef,
  schoolDeleteDef,
  classCreateDef,
  classUpdateDef,
  classDeleteDef,
  userCreateDef,
  userUpdateDef,
  userDeleteDef
];

export const MutationDef = defs.length > 0 ? `
	type Mutation {
		${defs.join('\n\t\t')}
	}
` : '';

export const Mutation = defs.length > 0 ? {
  schoolCreate,
  schoolUpdate,
  schoolDelete,
  classCreate,
  classUpdate,
  classDelete,
  userCreate,
  userUpdate,
  userDelete,
} : null;
