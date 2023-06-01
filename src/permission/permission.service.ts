import { BUSINESS_ERROR_CODE } from '@/common/exceptions/business.error.codes';
import { BusinessException } from '@/common/exceptions/business.exception';
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Permission } from './entities/permission.entity';

@Injectable()
export class PermissionService {
  constructor(
    @Inject('PERMISSION_REPOSITORY')
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  async create(createPermissionDto: CreatePermissionDto) {
    const isCodeExists = await this.permissionRepository.findOne({
      where: {
        code: createPermissionDto.code,
      },
    });

    // code 唯一
    if (isCodeExists) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: 'coed已存在',
      });
    }

    return this.permissionRepository.save({
      ...createPermissionDto,
      createDate: new Date(),
    });
  }

  findAll() {
    return this.permissionRepository.find();
  }

  findOne(id: number) {
    return this.permissionRepository.findOne({
      where: {
        permissionId: id,
      },
    });
  }

  async update(updatePermissionDto: UpdatePermissionDto) {
    const { permissionId, ...ohters } = updatePermissionDto;
    return this.permissionRepository.update(permissionId, ohters);
  }

  remove(id: number) {
    return this.permissionRepository.delete(id);
  }
}
