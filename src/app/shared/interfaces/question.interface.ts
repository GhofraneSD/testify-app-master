import { Choice } from './choice.interface';

export interface Question {
  _id?: string;
  text: string;
  choices: Choice[];
}
