import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreatePermissionDto } from './create-permission.dto';

export class UpdatePermissionDto extends PartialType(CreatePermissionDto) {
  @IsNotEmpty({ message: '非空' })
  @IsString({ message: '字符串' })
  @ApiProperty({
    example: '1',
    description: '权限 id',
  })
  permissionId: number;
}
