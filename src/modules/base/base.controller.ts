import { createResponseData } from '@/utils/util';

export default class BaseController {
  success(data = null, msg = 'OK') {
    return createResponseData(200, msg, data);
  }

  error(msg = '请求失败', data = null, code = 500) {
    return createResponseData(code, msg, data);
  }
}
