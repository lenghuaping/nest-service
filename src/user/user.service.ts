import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { SetWorkSpacePayload } from './dto/set-work-sapce.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  find(params: FindUserDto) {
    return this.userRepository.findOne({
      where: {
        email: params.email,
      },
    });
  }

  setWorkSpace(setWorkSpaceDto: SetWorkSpacePayload) {
    console.log(setWorkSpaceDto, 'setWorkSpaceDto');
    return this.userRepository
      .createQueryBuilder('user')
      .update(User)
      .set({
        work_space: setWorkSpaceDto.work_space,
      })
      .where('id = :id', { id: setWorkSpaceDto.user_id })
      .execute();
  }

  getWorkSpace(user_id: number) {
    console.log(user_id, 'getWorkSpace');
    return this.userRepository
      .createQueryBuilder('user')
      .select(['user.work_space'])
      .where({ id: user_id })
      .getOne();
  }
}
