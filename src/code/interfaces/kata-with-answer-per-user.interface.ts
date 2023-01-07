import { Document } from 'mongoose';
import { IKataRunSettings } from './kata-run-settings.interface';
import { IKataRun } from './kata-run.interface';
import { IKataAnswerWithCode } from './kata-answer-with-code.interface';

export interface IKataWithAnswerPerUser {
  id?: string;
  name: string;
  statement: string;
  creatorId: string;
  settings: IKataRunSettings;
  kataRuns: IKataRun[];
  kataAnswer?: IKataAnswerWithCode[];
}
