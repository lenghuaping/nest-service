import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateGitlabDto {
  @IsNotEmpty({ message: 'id' })
  @ApiProperty({
    example: 2650,
    description: 'id',
  })
  id: number;

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

export class SetGitlabDto {
  @IsNotEmpty({ message: 'id必填' })
  @ApiProperty({
    example: 2650,
    description: 'id',
  })
  id: number;

  @IsNotEmpty({ message: 'is_privatization_project必填' })
  @ApiProperty({
    example: 0,
    description: '是否私有化仓库',
  })
  is_privatization_project: boolean;
}
