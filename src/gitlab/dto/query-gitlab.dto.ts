import { ApiProperty } from '@nestjs/swagger';

export class QueryGitlabDto {
  @ApiProperty({
    example: 1,
    description: '当前页码',
  })
  current: number;

  @ApiProperty({
    example: 20,
    description: '查询数量',
  })
  limit: number;

  @ApiProperty({
    example: '123456',
    description: '描述',
    required: false,
  })
  description?: string;

  @ApiProperty({
    example: 0,
    description: '是否私有化仓库',
    required: false,
  })
  is_privatization_project?: boolean;
}
