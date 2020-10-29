import { UserType } from '../../types/outputs/user/user';
import { SchoolType } from '../../types/outputs/school/school';
import { ClassType } from '../../types/outputs/class/class';

export const OutputDef = [
	UserType,
	SchoolType,
	ClassType
].join('\n');
