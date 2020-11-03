import {School} from './school.interface';
import {User} from './user.interface';

export interface Class {
  id: string;
  name: string;
  school: School;
  teachers: User[];
  students: User[];
  createdAt: string;
  updatedAt: string;
}
