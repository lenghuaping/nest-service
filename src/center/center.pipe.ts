import { BUSINESS_ERROR_CODE } from '@/common/exceptions/business.error.codes';
import { BusinessException } from '@/common/exceptions/business.exception';
import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class CenterPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const dto = plainToInstance(metadata.metatype, value);
    const errors = await validate(dto);
    if (errors.length > 0) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.VALIDATION_ERROR,
        message: '参数错误',
      });
    }
    return value;
  }
}
