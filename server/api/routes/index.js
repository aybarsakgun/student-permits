import DDOS from 'ddos';
import { Router } from 'express';
import { User } from '../models';
import { Class } from '../models';

const router = Router();

if (process.env.DEV_ENV !== 'true') {
	const ddos = new DDOS();
	router.use(ddos.express);
}

router.get('/test', async (req, res) => {
	const findStudents = User.findById('5f72458d9f35d035709cf89f').populate('students').exec();
	const findClassTeachers = await Class.find({_id: '5f737a7a03d6bd0fd07d72ac'}).populate('teachers').exec();
	const findTeacherClasses = await Class.find().where('teachers').in('5f72458d9f35d035709cf89f').populate('school').populate('teachers').populate('students').exec();
	const findUserWithClassesTeacher =  await User.findById('5f9aa38b31723c43e84d9628').populate({path: 'teacherClasses', populate: {path: 'students teachers'}}).exec();
	const findUserWithClassesStudent =  await User.findById('5f9aa38b31723c43e84d9628').populate({
    path: 'studentClasses', populate: {
      path: 'students teachers'
    }
	}).exec();
	const findUser =  await User.findById('5f9aa38b31723c43e84d9628').exec();
	// res.send({ classes: findClasses })
	// res.send({ findClassTeachers: findClassTeachers, findTeacherClasses: findTeacherClasses })
	res.send({ findUser: findUser, findUserWithClassesTeacher: findUserWithClassesTeacher, findUserWithClassesStudent: findUserWithClassesStudent })
});

export default router;
