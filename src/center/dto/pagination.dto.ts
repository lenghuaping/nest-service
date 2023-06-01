import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto<DataType> {
  @ApiProperty()
  list: DataType[];

  @ApiProperty()
  current: number;

  @ApiProperty()
  limit: number;

  @ApiProperty()
  total: number;
}
