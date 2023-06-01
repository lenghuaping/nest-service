import * as fs from 'fs';
import { parse } from 'yaml';

export enum ENV_TYPE {
  mysql = 'MYSQL',
  redis = 'REDIS',
}

export const getEnv = () => process.env.ENV_MODE;

export const parsingEnvConfig = () => {
  const enviroment = getEnv();
  const yaml = fs.readFileSync(
    `${process.cwd()}/config/.${enviroment}.yaml`,
    'utf8',
  );
  return parse(yaml);
};
