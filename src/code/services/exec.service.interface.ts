import { IKata, IKataRun } from '../interfaces';
import { IKataAnswer } from '../interfaces/kata-answer.interface';
import { ExecResultStepDto } from '../dto/exec/exec-result-step.dto';

export interface IExecService {
  prepareCodeExecution(code: string, test: string, id: string): Promise<string>;

  execCode(fileZip: string, id: string): Promise<ExecResultStepDto[]>;
}
