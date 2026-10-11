import {Body, Controller, Get, HttpCode, HttpStatus, Ip, Post, UseGuards,} from '@nestjs/common';
import {AuthService} from './auth.service.js';
import {LoginDto} from './dto/login.dto.js';
import {JwtAuthGuard} from "../common/guards/jwt-auth.guard.js";
import {type JwtAccessPayload} from "./types/jwt-payload.type.js";
import {CurrentUser} from "../common/decorators/current-user.decorator.js";
import {RefreshDto} from "./dto/refresh.dto.js";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  create(@Body() loginDto: LoginDto, @Ip() ip:string) {
    return this.authService.login(
      loginDto.email,
      loginDto.password, {
        ipAddress: ip
      }
    );
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async me(@CurrentUser() user: JwtAccessPayload) {
    return await this.authService.me(user.userId);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refresh(@Body() dto: RefreshDto, @Ip() ip:string) {
    return this.authService.refresh(dto.refreshToken, {
      ipAddress: ip
    })
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async logout(@CurrentUser() user : JwtAccessPayload){
    await  this.authService.revokeSession(user.userId,user.sid)
    return {
      success : true
    }
  }

}
