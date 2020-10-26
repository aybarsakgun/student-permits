import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

/** School mongoose schema. */
const SchoolSchema = new Schema({
		name: {
			type: String,
			unique: true,
			required: [true, 'School name can\'t be blank']
		}
	},
	{
		collection: 'Schools',
		timestamps: true
	});

/** Add unique validator plugin to School schema. */
SchoolSchema.plugin(uniqueValidator, { message: 'is already taken' });

/** Set School schema to a model called School */
export default mongoose.model('School', SchoolSchema);