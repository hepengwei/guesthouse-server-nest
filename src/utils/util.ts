import * as md5 from 'md5';

// 创建统一的响应数据
export const createResponseData = (
  code: number,
  msg: string,
  data: any = null,
) => {
  return { code, data, msg };
};

export const myMd5 = (str: string) => {
  const salt = 'guesthouse';
  return str ? md5(`${str}${salt}`) : '';
};
