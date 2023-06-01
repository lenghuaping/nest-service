import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Column } from 'typeorm';
import { CreateSecretDto } from './create-secret.dto';

export class UpdateSecretDto extends CreateSecretDto {
  @Column()
  @IsNotEmpty({ message: '密钥id必填' })
  @ApiProperty({
    example: 1,
    description: 'id',
  })
  id: number;
}
