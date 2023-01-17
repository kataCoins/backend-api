import { ExecResultStepDto } from './exec-result-step.dto';
import { SignedTransaction } from 'web3-eth-accounts';
import { IsDefined, IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';

export class ExecResponseDto {
  @IsDefined()
  @Expose()
  exec_result: ExecResultStepDto;
}
