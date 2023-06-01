/**
 * 全局返回参数
 */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        // if (data instanceof Error) {
        //   return {
        //     data: null,
        //     status: 0,
        //     message: data.message,
        //     success: true,
        //   };
        // }
        return {
          data,
          status: 0,
          message: 'success',
          success: true,
        };
      }),
    );
  }
}
