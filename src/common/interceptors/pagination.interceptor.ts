import { PaginationDto } from '@/common/dto/pagination.dto';
import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

export const PaginationInterceptor = <DataType extends Type<any>>(
  dto: DataType,
) => {
  return applyDecorators(
    ApiExtraModels(PaginationDto),
    ApiExtraModels(dto),
    ApiOkResponse({
      status: 200,
      schema: {
        allOf: [
          {
            $ref: getSchemaPath(PaginationDto),
          },
          {
            properties: {
              list: { items: { $ref: `${getSchemaPath(dto)}` } },
            },
          },
        ],
      },
    }),
  );
};
