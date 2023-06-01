import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Column } from 'typeorm';

export class FindSecretDto {
  @Column()
  @IsNotEmpty({ message: '密钥必填' })
  @ApiProperty({
    example: '123456',
    description: 'Gitlab密钥',
  })
  secret: string;

  @Column()
  @IsNotEmpty({ message: '花名必填' })
  @ApiProperty({
    example: '空谷',
    description: '花名',
  })
  name: string;

  @Column()
  @IsNotEmpty({ message: 'id必填' })
  @ApiProperty({
    example: 1,
    description: 'id',
  })
  id: number;
}
