import { CreateSecretDBDto } from '@/secret/dto/create-secret.dto';
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UpdateSecretDto } from './dto/update-secret.dto';
import { Secret } from './entities/secret.entity';

@Injectable()
export class SecretService {
  constructor(
    @Inject('Secret_Repository')
    private readonly secretRepository: Repository<Secret>, // private readonly centerService: CenterService,
  ) {}

  create(createSecretDto: CreateSecretDBDto) {
    return this.secretRepository
      .createQueryBuilder()
      .insert()
      .into(Secret)
      .values([
        {
          user: () => String(createSecretDto.userId),
          secret: createSecretDto.secret,
          name: createSecretDto.name,
        },
      ])
      .execute();
    // return this.secretRepository.save({
    //   secret: createSecretDto.secret,
    //   name: createSecretDto.name,
    //   user: { id: createSecretDto.userId },
    // });
  }

  update(updateSecretDto: UpdateSecretDto) {
    return this.secretRepository.save(updateSecretDto);
  }

  findUserSecret(id: number) {
    return this.secretRepository
      .createQueryBuilder('secret')
      .where('secret.userId = :userId', {
        userId: id,
      })
      .getOne();
  }
}
