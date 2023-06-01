import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { PermissionEnum } from '../permission.enum';

export class CreatePermissionDto {
  @IsNotEmpty({ message: '非空' })
  @IsString({ message: '字符串' })
  @ApiProperty({
    example: 'login',
    description: '权限 code',
  })
  code: string;

  @IsNotEmpty({ message: '非空' })
  @IsString({ message: '字符串' })
  @ApiProperty({
    example: '新增用户',
    description: '权限名称',
  })
  name: string;

  @IsNotEmpty({ message: '非空' })
  @IsString({ message: '字符串' })
  @ApiProperty({
    example: '没有此权限无法新增用户',
    description: '权限描述',
  })
  description: string;

  @IsEnum({ message: '非法枚举' })
  @ApiProperty({
    example: PermissionEnum.MENU,
    description: '权限类型',
    enum: PermissionEnum,
  })
  type: string;
}
