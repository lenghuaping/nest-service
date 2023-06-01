import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';

interface IServerRespose {
  data: any;
}

const GITLAB_CONFIG = {
  API_URL: 'http://gitlab.uniubi.com/api/v4',
  TOKEN: 'jMeAUQbW1L-EEoe5qAtr',
  // TOKEN: 'x-JKrrbPwU_6XnjpM1Vb',
};

const GITLAB_HEADER = {
  'PRIVATE-TOKEN': GITLAB_CONFIG.TOKEN,
};

export interface IBaseResponse {
  code: number;
  message: string;
  data: any;
  status: number;
}

export const request = async (
  options: AxiosRequestConfig<any>,
): Promise<IBaseResponse> => {
  const { headers = {}, ...rest } = options;
  const res = await axios.request<IBaseResponse, IBaseResponse>({
    ...rest,
    baseURL: GITLAB_CONFIG.API_URL,
    timeout: 10000,
    headers: {
      ...headers,
      ...GITLAB_HEADER,
    },
  });

  const { message, data, code, status } = res;
  return new Promise((resolve) => {
    resolve({
      message,
      data,
      code,
      status,
    });
  });
};

axios.interceptors.response.use(
  function (response) {
    const { data, ...rest } = response;
    return Promise.resolve({
      code: 1,
      message: 'success',
      data,
      ...rest,
    });
  },
  (error) => {
    const errorMessage = error.response.data?.message || 'unknown error';
    return Promise.resolve({
      code: 0,
      message: errorMessage,
      status: error.response.status,
      data: error.response.statusText,
    });
  },
);
