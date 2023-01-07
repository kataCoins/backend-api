import { IKataRunSettings } from './kata-run-settings.interface';
import { IKataRun } from './kata-run.interface';

export interface IKata {
  id?: string;
  name: string;
  statement: string;
  creatorId: string;
  settings: IKataRunSettings;
  kataRuns: string[] | IKataRun[];
}
