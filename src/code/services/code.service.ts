import { Injectable, NotFoundException } from '@nestjs/common';
import { KataRunDto } from '../dto/kata-run.dto';
import { v4 as uuid } from 'uuid';
import { ExecPythonService } from './exec-python.service';
import { FileUtilsService } from './file-utils.service';
import { FileStorageService } from './file-storage.service';
import { ExecResultStepDto } from '../dto/exec/exec-result-step.dto';
import { ContractService } from '../../contract/contract.service';
import { ApiInternalServerErrorResponse } from '@nestjs/swagger';

@Injectable()
export class CodeService {
  constructor(
    private readonly fileUtilsService: FileUtilsService,
    private readonly fileStorageService: FileStorageService,
    private readonly execPythonService: ExecPythonService,
    private readonly contractService: ContractService,
  ) {}
  async runCode(kataRunDto: KataRunDto): Promise<ExecResultStepDto> {
    try {
      await this.contractService.canExecuteKata(
        kataRunDto.kata_id,
        kataRunDto.user_address,
      );
    } catch (e) {
      throw new NotFoundException('User cannot execute this kata');
    }

    const kataDefinition = await this.contractService.getKata(
      kataRunDto.kata_id,
    );
    if (!kataDefinition) {
      throw new NotFoundException('Kata not found');
    }
    const test = kataDefinition.test;

    const idExec = uuid();
    const files = await this.execPythonService.prepareCodeExecution(
      kataRunDto.code,
      test,
      idExec,
    );

    if (!files)
      throw ApiInternalServerErrorResponse({
        description: 'Error preparing files for execution',
      });

    const execResults = await this.execPythonService.execCode(files, idExec);
    await this.fileStorageService.deleteExecFile(files);
    if (!execResults)
      throw ApiInternalServerErrorResponse({
        description: 'Error are occurred during execution',
      });

    const result: ExecResultStepDto = execResults.find(
      (execResult) => execResult.name === 'Test',
    );
    if (result.status === 0) {
      console.log('Test passed');
      /// TODO valid test and give kata to user
    }
    return result;
  }
}
