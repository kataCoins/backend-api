import { Injectable } from '@nestjs/common';
import { KataRunDto } from '../dto/kata-run.dto';
import { v4 as uuid } from 'uuid';
import { ExecPythonService } from './exec-python.service';
import { FileUtilsService } from './file-utils.service';
import { FileStorageService } from './file-storage.service';
import { ExecResultStepDto } from '../dto/exec/exec-result-step.dto';

@Injectable()
export class CodeService {
  constructor(
    private readonly fileUtilsService: FileUtilsService,
    private readonly fileStorageService: FileStorageService,
    private readonly execPythonService: ExecPythonService,
  ) {}
  async runCode(kataRunDto: KataRunDto): Promise<ExecResultStepDto> {
    /// TODO : get test form smart contract
    const staticTest =
      'from app import sum_two_smallest_numbers\n\n\ndef test_1():\n    assert sum_two_smallest_numbers([5, 8, 12, 18, 22]) == 13\n\n\ndef test_2():\n    assert sum_two_smallest_numbers([7, 15, 12, 18, 22]) == 19\n\n\ndef test_3():\n    assert sum_two_smallest_numbers([25, 42, 12, 18, 22]) == 30\n';

    const idExec = uuid();
    const files = await this.execPythonService.prepareCodeExecution(
      kataRunDto.code,
      staticTest,
      idExec,
    );

    if (!files) return null;
    const execResults = await this.execPythonService.execCode(files, idExec);
    await this.fileStorageService.deleteExecFile(files);
    if (!execResults) return null;
    const testResult = execResults.find(
      (execResult) => execResult.name === 'Test',
    );
    console.log(testResult);
    return testResult;
  }
}
