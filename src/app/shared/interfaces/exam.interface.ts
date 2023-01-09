import { User } from './user.interface';
import { Group } from './group.interface';

export interface Exam {
  _id?: string;
  name: string;
  thumbnail?: string;
  expirationAfter?: Date;
  canAccess?: boolean;
  group?: Group | string;
  topics?: string;
  organizer?: User;
  description: string;
  duration: number;
}
