import { Document } from 'mongoose';
import { IKataFile } from './kata-file.interface';
import { LanguageRun } from './language-run.enum';

export interface IKataRun {
  id?: string;
  language: LanguageRun;
  functionDeclaration: string;
  testCode: string;
  kataId: string;
}
