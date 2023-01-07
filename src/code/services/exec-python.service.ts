import { Injectable } from '@nestjs/common';
import { IExecService } from './exec.service.interface';
import { IFileToWrite } from '../interfaces/file-to-write.interface';
import { ExecStepDto } from '../dto/exec/exec-step.dto';
import { ExecDto } from '../dto/exec/exec.dto';
import { HttpService } from '@nestjs/axios';
import { ExecResultStepDto } from '../dto/exec/exec-result-step.dto';
import { v4 as uuid } from 'uuid';
import { FileUtilsService } from './file-utils.service';
import { FileStorageService } from './file-storage.service';
import { firstValueFrom } from 'rxjs';
import { ExecSettingsDto } from '../dto/exec/exec-settings.dto';

@Injectable()
export class ExecPythonService implements IExecService {
  private readonly folderStorage: string;
  private readonly basePath: string;
  private readonly pythonExecStorage: string = 'exec/py';
  private readonly runnerUrl = `${process.env.THE_BOX_URL}/run`;

  constructor(
    private readonly fileUtilsService: FileUtilsService,
    private readonly fileStorageService: FileStorageService,
    private readonly httpService: HttpService,
  ) {
    this.basePath = process.env.STORAGE_DIR;
    this.folderStorage = `${this.basePath}/${this.pythonExecStorage}`;
  }

  async prepareCodeExecution(
    code: string,
    test: string,
    id: string,
  ): Promise<string | null> {
    const filesToZip: IFileToWrite[] = [];
    const codeFileNameSaved = `${uuid()}.py`;
    await this.fileStorageService.createFile('py', codeFileNameSaved, code);
    filesToZip.push({
      fileName: 'app.py',
      fileSaved: `${this.basePath}/py/${codeFileNameSaved}`,
    });

    const testFileNameSave = `${uuid()}.py`;
    await this.fileStorageService.createFile('py', testFileNameSave, test);
    filesToZip.push({
      fileName: 'test.py',
      fileSaved: `${this.basePath}/py/${testFileNameSave}`,
    });

    const filename = `${id}.zip`;
    const res = await this.fileUtilsService.zipFiles(
      filesToZip,
      this.folderStorage,
      filename,
    );
    for (const file of filesToZip) {
      await this.fileStorageService.deleteFile(file.fileSaved);
    }
    return res;
  }

  private getDefaultExecStep(): ExecStepDto[] {
    return [
      {
        name: 'Test',
        script: 'pytest --no-header -vv /box/code/test.py',
      } as ExecStepDto,
    ];
  }

  async execCode(fileZip: string, id: string): Promise<ExecResultStepDto[]> {
    const files = this.fileUtilsService.encodeFileToBase64(fileZip);
    const execSteps = this.getDefaultExecStep();
    const execDto = {
      request_id: id,
      steps: execSteps,
      settings: {
        run_time_limit: '5',
        wall_time_limit: '10',
        stack_size_limit: '128000',
        process_count_limit: '120',
        storage_size_limit: '10240',
        memory_limit: '512000',
      } as ExecSettingsDto,
      files: files,
    } as ExecDto;
    const response = await firstValueFrom(
      this.httpService.post(this.runnerUrl, execDto),
    );
    if (response.status == 200) {
      const result = response.data as ExecResultStepDto[];
      return result.map((res) => {
        if (res.status !== 0) {
          return {
            ...res,
            stdout: '',
            stderr: res.stdout + res.stderr,
          };
        }
        return res;
      });
    }
    return null;
  }
}
