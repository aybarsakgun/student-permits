import { EnumDef } from './enums';
import { InputDef } from './inputs';
import { OutputDef } from './outputs';

export const TypeDef = [
	EnumDef,
	InputDef,
	OutputDef
].join('\n');
