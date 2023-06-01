import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: '邮箱非空' })
  @IsString({ message: '邮箱是字符串' })
  @ApiProperty({
    example: 'konggu@uni-ubi.com',
    description: '邮箱',
  })
  email: string;

  // @IsNotEmpty({ message: '非空' })
  // @IsString({ message: '字符串' })
  // @ApiProperty({
  //   example: '8g5s',
  //   description: '权限 code',
  // })
  // code: string;
}
