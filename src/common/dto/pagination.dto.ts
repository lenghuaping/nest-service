import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class PaginationDto<T> {
  @IsArray()
  @ApiProperty({ isArray: true })
  readonly list: T[];

  @ApiProperty({ required: true, description: '当前页码' })
  readonly current: number;
  @ApiProperty({ required: true, description: '分页大小' })
  readonly limit: number;
  @ApiProperty({ required: true, description: '总数' })
  readonly total: number;

  constructor({
    list,
    current,
    limit,
    total,
  }: {
    list: T[];
    current: number;
    limit: number;
    total: number;
  }) {
    this.list = list;
    this.current = current;
    this.limit = limit;
    this.total = total;
  }
}
