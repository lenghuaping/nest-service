import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SendEmailCodeDto {
  @IsNotEmpty({ message: '邮箱必填' })
  @IsString({ message: '邮箱是字符串' })
  @ApiProperty({
    example: 'konggu@uni-ubi.com',
    description: '邮箱',
  })
  email: string;
}
