import { Module } from '@nestjs/common';
import { CodeService } from './services/code.service';
import { CodeController } from './code.controller';
import { ExecJavaScriptService } from './services/exec-java-script.service';
import { ExecPythonService } from './services/exec-python.service';
import { FileUtilsService } from './services/file-utils.service';
import { FileStorageService } from './services/file-storage.service';
import { HttpModule } from '@nestjs/axios';
import { ContractModule } from '../contract/contract.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    HttpModule.register({
      timeout: 10000,
      maxRedirects: 5,
    }),
    ContractModule,
  ],
  controllers: [CodeController],
  providers: [
    CodeService,
    FileStorageService,
    FileUtilsService,
    ExecPythonService,
    ExecJavaScriptService,
  ],
})
export class CodeModule {}
