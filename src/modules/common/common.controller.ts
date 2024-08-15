import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import BaseController from '../base/base.controller';

@Controller('common')
@ApiTags('公共接口模块')
export default class CommonController extends BaseController {
  constructor() {
    super();
  }

  @Get('getCitys')
  @ApiOperation({ summary: '获取名宿的城市列表' })
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
