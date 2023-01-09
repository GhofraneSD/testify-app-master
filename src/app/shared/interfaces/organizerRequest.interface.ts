import { User } from './user.interface';
import { Group } from './group.interface';

export interface OrganizerRequest {
  _id?: string;
  textRequest: string;
  state?:number;
  sendBy?: User;
  sendAt?: Date;
}
