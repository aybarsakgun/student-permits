import {USER_ROLE} from '../enums/user-role.enum';
import {School} from './school.interface';

export interface User {
  id: string;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  role: USER_ROLE;
  school: School;
  createdAt: string;
  updatedAt: string;
  accessToken?: string;
}
