import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class BranchInfoQueryDto {
  @IsNotEmpty({ message: 'Gitlab 项目id' })
  @ApiProperty({
    example: 2650,
    description: '项目id',
  })
  project_id: number;

  @ApiProperty({
    example: 'hangzhouBay',
    description: '分支名称',
  })
  branch_name: string;
}

export class BranchInfoDto {
  @IsNotEmpty({ message: '分支名称' })
  @ApiProperty({
    example: 2650,
    description: '项目id',
  })
  name: string;

  @ApiProperty({
    example: false,
    description: '是否已经合并',
  })
  merged: boolean;

  @ApiProperty({
    example: false,
    description: '分支是否保护中',
  })
  protected: boolean;
  @ApiProperty({
    example: false,
    description: '开发者可以推送',
  })
  developers_can_push: boolean;
  @ApiProperty({
    example: false,
    description: '开发者可以合并',
  })
  developers_can_merge: boolean;

  @ApiProperty({
    example: false,
    description: '可以推送',
  })
  can_push: boolean;
}

export class BranchBaseDto {
  @IsNotEmpty({ message: 'Gitlab 项目id' })
  @ApiProperty({
    example: 2650,
    description: '项目id',
  })
  project_id: number;

  @ApiProperty({
    example: 'hangzhouBay',
    description: '分支名称',
  })
  branch_name: string;
}

export class BranchProtectDto {
  @IsNotEmpty({ message: 'Gitlab 项目id' })
  @ApiProperty({
    example: 2650,
    description: '项目id',
  })
  project_id: number;

  @ApiProperty({
    example: 'hangzhouBay',
    description: '分支名称',
  })
  branch_name: string;

  @ApiProperty({
    example: 'hangzhouBay',
    description: '允许推送的权限',
  })
  push_access_level: string;

  @ApiProperty({
    example: 'hangzhouBay',
    description: '允许合并的权限',
  })
  merge_access_level: string;

  @ApiProperty({
    example: 'hangzhouBay',
    description: '允许取消保护的权限',
  })
  unprotect_access_level: string;
}
