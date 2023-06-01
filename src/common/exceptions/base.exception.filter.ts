import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  ServiceUnavailableException,
} from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();

    // if (exception instanceof Error) {
    //   request.log.error(exception);
    //   response.status(response.statusCode).send({
    //     httpStatus: response.statusCode,
    //     timestamp: new Date().toISOString(),
    //     path: request.url,
    //     message: exception.message,
    //   });
    // }

    // 非 HTTP 标准异常的处理。
    response.status(response.statusCode).send({
      statusCode: response.statusCode,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: new ServiceUnavailableException().getResponse(),
      // message: exception.message,
    });
  }
}
