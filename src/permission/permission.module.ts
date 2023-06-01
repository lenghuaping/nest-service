import { DatabaseModule } from '@/common/database/database.module';
import { Module } from '@nestjs/common';

import { PermissionController } from './permission.controller';
import { PermissiontProviders } from './permission.provider';
import { PermissionService } from './permission.service';

@Module({
  imports: [DatabaseModule],
  controllers: [PermissionController],
  providers: [...PermissiontProviders, PermissionService],
})
export class PermissionModule {}
