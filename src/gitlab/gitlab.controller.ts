// import { PaginationInterceptor } from '@/common/interceptors/pagination.interceptor';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PaginationInterceptor } from '@/common/interceptors/pagination.interceptor';
import { BranchBaseDto, BranchInfoDto } from '@/gitlab/dto/branch.dto';
import { GitlabProjectDto } from '@/gitlab/dto/gitlab-project.dto';
import { SetGitlabDto, UpdateGitlabDto } from '@/gitlab/dto/update-gitlab.dto';
import { Gitlab } from '@/gitlab/entities/gitlab.entity';
// import { Pagination } from '@/utils/global.type';
import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Query,
  Version,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { GitlabService } from './gitlab.service';

@ApiTags('Gitlab')
@Controller('gitlab')
export class GitlabController {
  constructor(private readonly gitlabService: GitlabService) {}

  @Get('list')
  @Version('1')
  @ApiOperation({ summary: '项目列表' })
  @PaginationInterceptor(GitlabProjectDto)
  @ApiQuery({
    name: 'current',
    required: true,
    type: Number,
  })
  @ApiQuery({
    name: 'limit',
    required: true,
    type: Number,
  })
  @ApiQuery({
    name: 'is_privatization_project',
    required: false,
    type: Boolean,
  })
  @ApiQuery({
    name: 'description',
    required: false,
    type: String,
  })
  list(
    @Query('current', ParseIntPipe) current: number,
    @Query('limit', ParseIntPipe) limit: number,
    @Query('description') description?: string,
    @Query('is_privatization_project') is_privatization_project?: boolean,
  ): Promise<PaginationDto<Gitlab>> {
    return this.gitlabService.list({
      current,
      limit,
      is_privatization_project,
      description,
    });
  }

  @Post('update')
  @Version('1')
  @ApiOperation({ summary: '设置项目名称' })
  @ApiOkResponse({
    status: 200,
    description: 'Success',
    type: 'string',
  })
  update(@Body() payload: UpdateGitlabDto) {
    const updated = this.gitlabService.update(payload);
    if (updated) {
      return '保存成功';
    }
    return '保存失败';
  }

  @Post('set')
  @Version('1')
  @ApiOperation({ summary: '设置项目是否私有化' })
  @ApiOkResponse({
    status: 200,
    description: 'Success',
    type: 'string',
  })
  set(@Body() payload: SetGitlabDto) {
    console.log(payload, 'SetGitlabDto payload');
    return this.gitlabService.set(payload);
  }

  @Get('pullGitlabProjectList')
  @Version('1')
  @ApiOperation({ summary: '拉取 Gitlab 项目列表' })
  @ApiOkResponse({
    status: 200,
    description: 'Success',
    type: 'string',
  })
  pullGitlabProjectList() {
    const res = this.gitlabService.pullGitlabList();
    if (res) {
      return 'Gitlab 项目拉取成功';
    }
    return 'Gitlab 项目拉失败';
  }

  @Get('branchInfo')
  @Version('1')
  @ApiOperation({ summary: '分支信息' })
  @ApiOkResponse({
    description: '分支信息',
    status: 200,
    type: BranchInfoDto,
  })
  async branchInfo(
    @Query('project_id', ParseIntPipe) projectId: number,
    @Query('branch_name') branch_name: string,
  ) {
    const info = await this.gitlabService.branchInfo({
      projectId,
      branch_name,
    });
    return info;
  }

  @Post('checkoutBranch')
  @Version('1')
  @ApiOperation({ summary: '切换分支' })
  @ApiOkResponse({
    description: '切换分支',
    status: 200,
    type: BranchInfoDto,
  })
  async checkoutBranch(@Body() body: BranchBaseDto) {
    const info = await this.gitlabService.checkoutBranch(body);
    console.log(info, 'info');
    return info;
  }

  @Post('protectBranch')
  @Version('1')
  @ApiOperation({ summary: '保护分支' })
  @ApiOkResponse({
    description: '保护分支',
    status: 200,
    type: BranchInfoDto,
  })
  async protectBranch(@Body() body: BranchBaseDto) {
    const info = await this.gitlabService.protectBranch({
      ...body,
    });
    console.log(info, 'info');
    return info;
  }
}
