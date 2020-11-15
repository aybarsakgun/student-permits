import {School} from './school.interface';

export enum USER_ROLE {
  ADMIN = 'ADMIN',
  SCHOOL_ADMIN = 'SCHOOL_ADMIN',
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT',
}

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
