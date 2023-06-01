import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class LoginRequestDto {
  @IsNotEmpty({ message: '邮箱必填' })
  @IsString({ message: '邮箱必须是字符串' })
  @ApiProperty({
    example: 'konggu@uni-ubi.com',
    description: '登录邮箱',
  })
  email: string;

  @IsNotEmpty({ message: '验证码必填' })
  @IsString({ message: '验证码必须是字符串' })
  @Length(6, 6, { message: '验证码必须是6位' })
  @ApiProperty({
    example: '123456',
    description: '邮箱验证码',
  })
  code: string;
}

export class LoginResponseDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'konggu@uni-ubi.com',
    description: '登录邮箱',
  })
  email: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: '1',
    description: '用户id',
  })
  id: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'asafhd23sdv',
    description: 'token',
  })
  access_token: string;
}
