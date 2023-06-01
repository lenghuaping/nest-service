import { request } from '@/utils/gitLabRequest';
import { DEVELOP_LEVEL } from './constant';

/**
 * Gitlab 项目列表
 */
export const fetchProjectList = async () => {
  return await request({
    url: '/projects',
    method: 'GET',
    params: {
      membership: 1,
      per_page: 100,
      simple: true,
      min_access_level: DEVELOP_LEVEL.developer,
    },
  });
};

interface IFetchBranchList {
  /**
   * 项目ID
   */
  projectId: number;
  /**
   * 分支名称
   */
  branch: string;
}

/**
 * 获取分支信息
 * @param params
 */
export const fetchBranchInfo = async (params: IFetchBranchList) => {
  return await request({
    url: `/projects/${params.projectId}/repository/branches/${params.branch}`,
    method: 'GET',
    params,
  });
};

interface IEffectCheckoutBranch {
  /**
   * 项目ID
   */
  project_id: number;
  /**
   * 切出来的分支名，一般是私有化的客户拼音
   */
  branch: string;
  /**
   * 私有化分支来源，默认master
   */
  ref: string;
  // projectDescription: string;
}

/**
 * 切换私有化分支
 * @param params
 */
export const effectCheckoutBranch = async (params: IEffectCheckoutBranch) => {
  return await request({
    url: `/projects/${params.project_id}/repository/branches`,
    method: 'POST',
    data: params,
  });
};

interface IEffectProtectBranch {
  /**
   * 项目ID
   */
  project_id: number;
  /**
   * name
   */
  name: string;
  /**
   * 保护级别
   */
  push_access_level: number;
  /**
   * 保护级别
   */
  merge_access_level: number;
  /**
   * 取消保护
   */
  unprotect_access_level: number;
}

/**
 * 保护私有化分支
 * @param params
 */
export const effectProtectBranch = async (params: IEffectProtectBranch) => {
  return await request({
    url: `/projects/${params.project_id}/protected_branches`,
    method: 'POST',
    data: params,
  });
};
