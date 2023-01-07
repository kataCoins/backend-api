import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { CodeService } from './services/code.service';
import { ApiTags } from '@nestjs/swagger';
import { KataRunDto } from './dto/kata-run.dto';
import { ExecResultStepDto } from './dto/exec/exec-result-step.dto';

@Controller('code')
@ApiTags('Code')
export class CodeController {
  constructor(private readonly codeService: CodeService) {}

  @Get()
  getCode(): string {
    return 'code';
  }

  @Post('run')
  public async runCode(
    @Res() res,
    @Req() req,
    @Body() kataRunDto: KataRunDto,
  ): Promise<ExecResultStepDto> {
    console.log(kataRunDto);
    const data = await this.codeService.runCode(kataRunDto);
    return res.status(200).json(data);
  }
}
