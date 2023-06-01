export enum BUSINESS_ERROR_CODE {
  /**
   * 公共错误码
   */
  COMMON = 10001,
  /**
   * toekn 无效
   */
  TOKEN_INVALID = 10002,
  /**
   * 禁止访问
   */
  ACCESS_FORBIDDEN = 10003,
  /**
   * 用户已冻结
   */
  USER_DISABLED = 10004,
  /**
   * SDK 没有权限
   */
  SDK_UNAUTHORIZED = 10005,
  /**
   * 请求参数校验错误
   */
  VALIDATION_ERROR = 10006,
  /**
   * 第三方接口报错
   */
  THIRD_API_ERROR = 10007,
  /**
   * Gitlab 信息提示
   */
  GITLAB_INFO = 20001,
}
