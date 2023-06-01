import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LogoutDto {
  @IsNotEmpty({ message: '邮箱必填' })
  @IsString({ message: '邮箱必须是字符串' })
  @ApiProperty({
    example: 'konggu@uni-ubi.com',
    description: '登录邮箱',
  })
  email: string;
}
