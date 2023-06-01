import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SetWorkSpacePayload {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: 1,
    description: '用户id',
  })
  user_id: number;

  @IsNotEmpty()
  @IsString({ message: '字符串' })
  @ApiProperty({
    example: 'C://user/konggu/uniubi',
    description: '私有化工作目录',
  })
  work_space: string;
}

export class SetWorkSpaceDto {
  @IsNotEmpty()
  @IsString({ message: '字符串' })
  @ApiProperty({
    example: 'C://user/konggu/uniubi',
    description: '私有化工作目录',
  })
  work_space: string;
}
