import { IsDefined, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class KataRunDto {
  @ApiProperty({
    example: '0xa84e69dfa451553698a4A897466Axxxxxxxxxxx',
  })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  user_address: string;

  @ApiProperty({
    example: 'def add(a, b):\n\treturn a + b',
  })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  code: string;

  @ApiProperty({
    example: 'af7c1fe6-d669-414e-b066-e9733f0de7a8',
  })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  kata_id: string;
}
