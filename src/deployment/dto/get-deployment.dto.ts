import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class GetDeploymentQueryDto {
  @IsNotEmpty({ message: 'id' })
  @ApiProperty({
    example: '123456',
    description: 'id',
  })
  id: number;

  @IsNotEmpty({ message: 'Gitlab 项目id' })
  @ApiProperty({
    example: 2650,
    description: '项目id',
  })
  project_id: string;

  @IsNotEmpty({ message: '描述' })
  @ApiProperty({
    example: '123456',
    description: '描述',
  })
  description: string;

  @IsNotEmpty({ message: 'Gitlab 项目地址' })
  @ApiProperty({
    example: '123456',
    description: 'Gitlab 项目地址',
  })
  repo_url: string;

  @IsNotEmpty({ message: '是否私有化仓库' })
  @ApiProperty({
    example: 0,
    description: '是否私有化仓库',
  })
  is_privatization_project: boolean;

  @IsNotEmpty({ message: '名称' })
  @ApiProperty({
    example: '数智建',
    description: '名称',
  })
  name: string;

  @IsNotEmpty({ message: 'Gitlab 仓库名称' })
  @ApiProperty({
    example: 'uniubi-smart-construction-web',
    description: 'Gitlab 仓库名称',
  })
  repo_name: string;
}

export class GetDeploymentListDto {
  @IsNotEmpty({ message: 'id' })
  @ApiProperty({
    example: '123456',
    description: 'id',
  })
  id: number;

  @IsNotEmpty({ message: '私有化名称' })
  @ApiProperty({
    example: '杭州湾',
    description: '私有化名称',
  })
  name: string;

  @ApiProperty({
    example: '123456',
    description: '描述',
  })
  description?: string;

  @IsNotEmpty({ message: 'Gitlab 分支名称' })
  @ApiProperty({
    example: 'hangzhouBay',
    description: 'Gitlab 分支名称',
  })
  branch_name: string;

  @IsNotEmpty({ message: 'Gitlab 分支名称' })
  @ApiProperty({
    example: 'hangzhouBay',
    description: 'Gitlab 分支名称',
  })
  docs: string;
}
