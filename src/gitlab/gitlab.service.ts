import { BUSINESS_ERROR_CODE } from '@/common/exceptions/business.error.codes';
import { BusinessException } from '@/common/exceptions/business.exception';
import { BranchBaseDto } from '@/gitlab/dto/branch.dto';
import { QueryGitlabDto } from '@/gitlab/dto/query-gitlab.dto';
import { SetGitlabDto, UpdateGitlabDto } from '@/gitlab/dto/update-gitlab.dto';
import {
  effectCheckoutBranch,
  effectProtectBranch,
  fetchBranchInfo,
  fetchProjectList,
} from '@/helper/gitlab/api';
import { DEVELOP_LEVEL } from '@/helper/gitlab/constant';
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Gitlab } from './entities/gitlab.entity';

@Injectable()
export class GitlabService {
  constructor(
    @Inject('Gitlab_Repository')
    private readonly gitalbRepository: Repository<Gitlab>,
  ) {}

  // 拉取最新项目
  async pullGitlabList() {
    const res = await fetchProjectList();
    if (res?.code) {
      const dataBaseList = await this.gitalbRepository.find();
      (res.data || []).forEach((project) => {
        // 数据库中不存在的项目，需要新入库
        if (!dataBaseList.find((d) => d.project_id !== project.id)) {
          const item = {
            project_id: project.id,
            repo_url: project.http_url_to_repo,
            description: project.description,
            is_privatization_project: false,
          };
          this.gitalbRepository.save(item);
        }
      });
      return true;
    } else {
      throw new BusinessException({ code: res.status, message: res.message });
    }
  }

  async update(updateGitlabDto: UpdateGitlabDto) {
    return this.gitalbRepository
      .createQueryBuilder()
      .update(Gitlab)
      .set({
        name: updateGitlabDto.name,
        repo_name: updateGitlabDto.repo_name,
      })
      .where('id = :id', { id: updateGitlabDto.id })
      .execute();
  }

  // 设置是否私有化项目
  async set(setGitlabDto: SetGitlabDto) {
    // return this.gitalbRepository.save({
    //   id: setGitlabDto.id,
    //   is_privatization_project: setGitlabDto.is_privatization_project,
    // });
    const result = await this.gitalbRepository
      .createQueryBuilder()
      .update(Gitlab)
      .set({
        is_privatization_project: setGitlabDto.is_privatization_project,
      })
      .where('id = :id', { id: setGitlabDto.id })
      .execute();
    if (result.affected > 0) {
      return `${
        setGitlabDto.is_privatization_project ? '设置' : '取消'
      }私有化成功`;
    }
    return '操作失败';
  }

  // 列表查询
  async list(params: QueryGitlabDto) {
    const { current, limit, is_privatization_project, description } = params;
    const skipCount = (current - 1) * limit;
    const queryBuilder = this.gitalbRepository
      .createQueryBuilder('gitlab')
      .select([
        'gitlab.id',
        'gitlab.repo_url',
        'gitlab.name',
        'gitlab.description',
        'gitlab.is_privatization_project',
        'gitlab.repo_name',
        'gitlab.project_id',
      ]);

    if (description) {
      queryBuilder.where('gitlab.description like :description', {
        description: `%${description}%`,
      });
    }

    // TODO: 布尔值查询
    if (is_privatization_project) {
      queryBuilder.where({
        is_privatization_project: Boolean(is_privatization_project),
      });
    }

    const [list, total] = await Promise.all([
      queryBuilder
        .skip(skipCount)
        .take(limit)
        .orderBy('gitlab.is_privatization_project', 'DESC')
        .getMany(),
      queryBuilder.getCount(),
    ]);

    return {
      current,
      limit,
      total,
      list,
    };
  }

  async branchInfo(params: { branch_name: string; projectId: number }) {
    const result = await fetchBranchInfo({
      branch: params.branch_name,
      projectId: params.projectId,
    });

    if (result.message === 'success') {
      return result.data;
    }

    if (result.message === '404 Project Not Found') {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.THIRD_API_ERROR,
        message: 'Gitlab 项目未找到',
      });
    }
    if (result.message === '404 Branch Not Found') {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.GITLAB_INFO,
        message: '分支不存在',
      });
    }
    throw new BusinessException({
      code: BUSINESS_ERROR_CODE.THIRD_API_ERROR,
      message: 'Gitlab接口请求错误',
    });
  }

  // 切换分支
  async checkoutBranch(params: BranchBaseDto) {
    const result = await effectCheckoutBranch({
      branch: params.branch_name,
      project_id: params.project_id,
      ref: 'master',
    });

    if (result.message === 'success') {
      return result.data;
    }

    if (result.message === 'Branch already exists') {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.GITLAB_INFO,
        message: '分支已存在',
      });
    }

    throw new BusinessException({
      code: BUSINESS_ERROR_CODE.THIRD_API_ERROR,
      message: 'Gitlab接口请求错误',
    });
  }

  // 保护分支
  async protectBranch(params: BranchBaseDto) {
    const result = await effectProtectBranch({
      name: params.branch_name,
      project_id: params.project_id,
      push_access_level: DEVELOP_LEVEL.maintainer,
      unprotect_access_level: DEVELOP_LEVEL.maintainer,
      merge_access_level: DEVELOP_LEVEL.maintainer,
    });

    console.log(result, 'result');

    if (result.message === 'success') {
      return result.data;
    }

    if (result.message.includes('already exists')) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.GITLAB_INFO,
        message: '已是保护分支',
      });
    }

    throw new BusinessException({
      code: BUSINESS_ERROR_CODE.THIRD_API_ERROR,
      message: 'Gitlab接口请求错误',
    });
  }
}
