import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

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

SchoolSchema.plugin(uniqueValidator, { message: 'is already taken' });

export default mongoose.model('School', SchoolSchema);
