import { UserType } from '../../types/outputs/user/user';
import { SchoolType } from '../../types/outputs/school/school';
import { ClassType } from '../../types/outputs/class/class';

/** Output type definitions */
export const OutputDef = [
	UserType,
	SchoolType,
	ClassType
].join('\n');
