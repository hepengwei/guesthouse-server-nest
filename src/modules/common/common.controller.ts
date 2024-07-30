import { Controller, Get } from '@nestjs/common';
import BaseController from '../base/base.controller';

@Controller('common')
export default class CommonController extends BaseController {
  constructor() {
    super();
  }

  @Get('getCitys')
  getCitys() {
    return this.success([
      { label: '所有', value: 'all' },
      { label: '北京', value: '10001' },
      { label: '武汉', value: '10002' },
      { label: '深圳', value: '10003' },
      { label: '上海', value: '10004' },
    ]);
  }
}
