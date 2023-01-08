import { Test, TestingModule } from '@nestjs/testing';
import { CodeController } from './code.controller';
import { CodeService } from './services/code.service';
import { FileStorageService } from './services/file-storage.service';
import { FileUtilsService } from './services/file-utils.service';
import { ExecPythonService } from './services/exec-python.service';
import { ExecJavaScriptService } from './services/exec-java-script.service';
import { HttpModule } from '@nestjs/axios';

describe('CodeController', () => {
  let controller: CodeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule.register({
          timeout: 10000,
          maxRedirects: 5,
        }),
      ],
      controllers: [CodeController],
      providers: [
        CodeService,
        FileStorageService,
        FileUtilsService,
        ExecPythonService,
        ExecJavaScriptService,
      ],
    }).compile();

    controller = module.get<CodeController>(CodeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
