import { ExecResultStepDto } from './exec-result-step.dto';
import { IsDefined } from 'class-validator';
import { Expose } from 'class-transformer';

export class ExecResponseDto {
  @IsDefined()
  @Expose()
  exec_result: ExecResultStepDto;
}
