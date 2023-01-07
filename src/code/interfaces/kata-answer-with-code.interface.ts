import { Document } from 'mongoose';
import { IKataAnswerResult } from './kata-answer-result.interface';
import { LanguageRun } from './language-run.enum';

export interface IKataAnswerWithCode {
  id?: string;
  language: LanguageRun;
  code: string;
  kataId: string;
  userId: string;
  kataResult?: IKataAnswerResult;
}
