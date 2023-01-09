import { Choice } from './choice.interface';

export interface Answer {
  _id?: string;
  isCorrect?: boolean;
  chosenChoices: string[];
}
