import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class FindUserDto {
  @IsString({ message: '字符串' })
  @ApiProperty({
    example: 1,
    description: '用户ID',
  })
  userId?: number;

  @IsString({ message: '字符串' })
  @ApiProperty({
    example: 'konggu@uni-ubi.com',
    description: '邮箱',
  })
  email: string;
}
