import { DatabaseModule } from '@/common/database/database.module';
import { Module } from '@nestjs/common';
import { GitlabController } from './gitlab.controller';
import { GitlabProviders } from './gitlab.provider';
import { GitlabService } from './gitlab.service';

@Module({
  imports: [DatabaseModule],
  controllers: [GitlabController],
  providers: [...GitlabProviders, GitlabService],
})
export class GitlabModule {}
