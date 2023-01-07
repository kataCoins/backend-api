import { Injectable } from '@nestjs/common';
import { IExecService } from './exec.service.interface';
import { IKata, IKataRun } from '../interfaces';
import { IKataAnswer } from '../interfaces/kata-answer.interface';
import { ExecResultStepDto } from '../dto/exec/exec-result-step.dto';
import { ExecStepDto } from '../dto/exec/exec-step.dto';
import { IFileToWrite } from '../interfaces/file-to-write.interface';
import { HttpService } from '@nestjs/axios';
import * as fs from 'fs';
import { promisify } from 'util';
import { ExecSettingsDto } from '../dto/exec/exec-settings.dto';
import { ExecDto } from '../dto/exec/exec.dto';
import { FileUtilsService } from './file-utils.service';
import { FileStorageService } from './file-storage.service';

@Injectable()
export class ExecJavaScriptService /*implements IExecService */ {
  private readonly finalFileName: string = 'app.test.js';
  private readonly folderStorage: string;
  private readonly basePath: string;
  private readonly javaScriptExecStorage: string = 'exec/js';
  private readonly runnerUrl = `${process.env.THE_BOX_URL}/run`;

  constructor(
    private readonly fileUtilsService: FileUtilsService,
    private readonly fileStorageService: FileStorageService,
    private readonly httpService: HttpService,
  ) {
    this.basePath = process.env.STORAGE_DIR;
    this.folderStorage = `${this.basePath}/${this.javaScriptExecStorage}`;
  }

  async prepareCodeExecution(
    kataRun: IKataRun,
    kataAnswer: IKataAnswer,
    id: string,
  ): Promise<string> {
    const finalFile = await this.writeFinalFile(
      kataAnswer.code,
      kataRun.testCode,
      id,
    );
    if (!finalFile) return null;
    const filename = `${id}.zip`;
    const filesToZip: IFileToWrite[] = this.getDefaultFileToZip();
    filesToZip.push({
      fileName: this.finalFileName,
      fileSaved: finalFile,
    } as IFileToWrite);
    const zip = await this.fileUtilsService.zipFiles(
      filesToZip,
      this.folderStorage,
      filename,
    );
    await this.fileStorageService.deleteExecFile(finalFile);
    return zip;
  }

  private async writeFinalFile(
    codeSaved: string,
    testSaved: string,
    id: string,
  ): Promise<string> {
    const dataToWrite = `${codeSaved}\n${testSaved}`;
    if (
      !this.fileUtilsService.checkIfFileOrDirectoryExists(this.folderStorage)
    ) {
      this.fileUtilsService.createDirectory(this.folderStorage);
    }
    const fileSaved = `${this.folderStorage}/${id}.js`;
    const writeFile = promisify(fs.writeFile);
    try {
      await writeFile(fileSaved, dataToWrite, 'utf-8');
      return fileSaved;
    } catch (e) {
      console.error(e);
    }
    return null;
  }

  private getDefaultFileToZip(): IFileToWrite[] {
    return [
      {
        fileName: 'jest.config.js',
        fileSaved: `${this.basePath}/run-assets/js/jest.config.js`,
      } as IFileToWrite,
    ];
  }

  private getDefaultExecStep(): ExecStepDto[] {
    return [
      {
        name: 'Test',
        script: 'cd /box/code && jest ',
      } as ExecStepDto,
    ];
  }

  async execCode(
    kata: IKata,
    fileZip: string,
    id: string,
  ): Promise<ExecResultStepDto[]> {
    const files = this.fileUtilsService.encodeFileToBase64(fileZip);
    const execSteps = this.getDefaultExecStep();
    const execSettings = kata.settings as ExecSettingsDto;
    const execDto = {
      request_id: id,
      steps: execSteps,
      settings: execSettings,
      files: files,
    } as ExecDto;
    const response = await this.httpService
      .post(this.runnerUrl, execDto)
      .toPromise();
    if (response.status == 200) {
      const result = response.data as ExecResultStepDto[];
      return result.map((res) => {
        if (res.status === 0) {
          return {
            ...res,
            stdout: res.stdout + res.stderr,
            stderr: '',
          };
        }
        return res;
      });
    }
    return null;
  }
}
