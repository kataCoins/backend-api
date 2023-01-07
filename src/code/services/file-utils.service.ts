import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { IFileToWrite } from '../interfaces/file-to-write.interface';
import * as AdmZip from 'adm-zip';

@Injectable()
export class FileUtilsService {
  readonly zipFile: string = 'code.zip';
  readonly zipFolderName: string = 'code';

  async zipFiles(
    files: IFileToWrite[],
    directory: string,
    filename: string,
  ): Promise<string | null> {
    if (!this.checkIfFileOrDirectoryExists(directory)) {
      this.createDirectory(directory);
    }

    const createdZipFile = `${directory}/${filename}`;

    const zip = new AdmZip();
    for (const file of files) {
      zip.addLocalFile(file.fileSaved, './code', file.fileName);
    }

    try {
      await zip.writeZipPromise(createdZipFile);
    } catch (e) {
      console.error(e);
      return;
    }
    return createdZipFile;
  }

  async test(): Promise<void> {
    const zip = new AdmZip();
    zip.addLocalFile('./storage/run-assets/js/jest.config.js', './code');
    await zip.writeZipPromise('./storage/run-assets/code.zip');
  }

  encodeFileToBase64(path: string): string {
    const buffer = fs.readFileSync(path);
    return buffer.toString('base64');
  }

  checkIfFileOrDirectoryExists(path: string): boolean {
    return fs.existsSync(path);
  }

  createDirectory(path: string): void {
    fs.mkdirSync(path);
  }
}
