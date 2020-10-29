import { UserInput } from '../../types/inputs/user/user';
import { SchoolInput } from '../../types/inputs/school/school';
import { ClassInput } from '../../types/inputs/class/class';

export const InputDef = [
	UserInput,
	SchoolInput,
	ClassInput
].join('\n');
