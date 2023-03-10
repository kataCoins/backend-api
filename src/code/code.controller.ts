import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { CodeService } from './services/code.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { KataRunDto } from './dto/kata-run.dto';
import { ExecResultStepDto } from './dto/exec/exec-result-step.dto';
import { ExecResponseDto } from './dto/exec/exec-response.dto';

@Controller('code')
@ApiTags('Code')
export class CodeController {
  constructor(private readonly codeService: CodeService) {}

  @Get()
  getCode(): string {
    return 'code';
  }

  @Post('run')
  @ApiOkResponse({
    type: ExecResponseDto,
  })
  public async runCode(
    @Res() res,
    @Req() req,
    @Body() kataRunDto: KataRunDto,
  ): Promise<ExecResponseDto> {
    // console.log(kataRunDto);
    const data = await this.codeService.runCode(kataRunDto);
    return res.status(200).json(data);
  }
}
