import { Controller, Post, Get, Body, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import JwtGuard from '@/decorators/jwtGuard.decorator';
import SerializeAndApiRes from '@/decorators/serializeAndApiRes.decorator';
import BaseController from '../base/base.controller';
import ResponseDto from '@/commonDto/response.dto';
import RegistUserDto from './dto/registUser.dto';
import LoginDto from './dto/login.dto';
import UpdateUserInfoDto from './dto/updateUserInfo.dto';
import LoginResponseDto from './responseDto/loginResponse.dto';
import UserService from './user.service';

@Controller('user')
@ApiTags('用户模块')
export default class UserController extends BaseController {
  constructor(private userService: UserService) {
    super();
  }

  @Post('regist')
  @ApiOperation({ summary: '注册' })
  @ApiOkResponse({ type: ResponseDto })
  async regist(@Body() dto: RegistUserDto) {
    const { userName, password } = dto;
    await this.userService.regist(userName, password);
    return this.success();
  }

  @Post('login')
  @ApiOperation({ summary: '登录' })
  @SerializeAndApiRes(LoginResponseDto)
  async login(@Body() dto: LoginDto) {
    const { userName, password } = dto;
    const data = await this.userService.login(userName, password);
    if (data) {
      return this.success(data);
    }
    return this.error();
  }

  @Get('logout')
  @ApiOperation({ summary: '退出登录' })
  @ApiOkResponse({ type: ResponseDto })
  @JwtGuard()
  async logout(@Req() req: any) {
    const { userName } = req.user;
    await this.userService.logout(userName);
    return this.success();
  }

  @Post('updateUserInfo')
  @ApiOperation({ summary: '修改用户信息' })
  @ApiOkResponse({ type: ResponseDto })
  @JwtGuard()
  async updateUserInfo(@Body() dto: UpdateUserInfoDto, @Req() req: any) {
    const { avatar = null, phone = null } = dto;
    const { userId } = req.user;
    await this.userService.updateUserInfo({
      avatar,
      phone,
      userId,
    });
    return this.success();
  }
}
