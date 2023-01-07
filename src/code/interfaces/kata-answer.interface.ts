import { IKataAnswerResult } from './kata-answer-result.interface';
import { LanguageRun } from './language-run.enum';

export interface IKataAnswer {
  id?: string;
  language: LanguageRun;
  code: string;
  kataId: string;
  userId: string;
  kataResult?: IKataAnswerResult;
}
