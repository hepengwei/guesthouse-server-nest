import { Controller, Post, Get, Body, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import BaseController from '../base/base.controller';
import RegistUserDto from './dto/registUser.dto';
import LoginDto from './dto/login.dto';
import UpdateUserInfoDto from './dto/updateUserInfo.dto';
import UserService from './user.service';

@Controller('user')
export default class UserController extends BaseController {
  constructor(private userService: UserService) {
    super();
  }

  @Post('regist')
  async regist(@Body() dto: RegistUserDto) {
    const { userName, password } = dto;
    await this.userService.regist(userName, password);
    return this.success();
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    const { userName, password } = dto;
    const data = await this.userService.login(userName, password);
    if (data) {
      return this.success(data);
    }
    return this.error();
  }

  @Get('logout')
  @UseGuards(AuthGuard('jwt'))
  async logout(@Req() req: any) {
    const { userName } = req.user;
    await this.userService.logout(userName);
    return this.success();
  }

  @Post('updateUserInfo')
  @UseGuards(AuthGuard('jwt'))
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
