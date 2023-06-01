import { AllExceptionsFilter } from '@/common/exceptions/base.exception.filter';
import { HttpExceptionFilter } from '@/common/exceptions/http.exception.filter';
import { TransformInterceptor } from '@/common/interceptors/transform.interceptor';
import { FastifyLogger } from '@/common/logger';
import { generateDocument } from '@/document';

import {
  ValidationPipe,
  VERSION_NEUTRAL,
  VersioningType,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: FastifyLogger,
    }),
  );
  app.useGlobalInterceptors(new TransformInterceptor());
  // 异常
  app.useGlobalFilters(new AllExceptionsFilter(), new HttpExceptionFilter());
  // 接口版本化管理
  app.enableVersioning({
    defaultVersion: [VERSION_NEUTRAL, '1', '2'],
    type: VersioningType.URI,
  });
  // await app.register(fastifyCookie, {
  //   secret: JWT_OPTIONS.secret, // for cookies signature
  // });
  // 校验参数
  app.useGlobalPipes(new ValidationPipe());

  // app.use(WhitelistMiddleware(JWT_WHITE_LIST));
  // 生成接口 swagger 文档
  await generateDocument(app);

  await app.listen(8980);
}

bootstrap();
