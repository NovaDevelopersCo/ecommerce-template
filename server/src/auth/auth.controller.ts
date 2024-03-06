import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  HttpCode,
  HttpStatus,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegistrationDto } from './dto';
import { CookieOptions, Response } from 'express';
import { REFRESH_COOKIE } from './constants';
import { Cookie, User } from 'src/core/decorators';
import { RefreshJwtGuard } from './guards/refresh-jwt.guard';

@UsePipes(new ValidationPipe({ whitelist: true }))
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  private optionsCookie: CookieOptions = {
    httpOnly: true,
    maxAge: 15 * 24 * 60 * 60 * 1000,
    path: '/',
  };

  @HttpCode(HttpStatus.OK)
  @Post('registration')
  async registration(
    @Body() dto: RegistrationDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const data = await this.authService.registration(dto);
    res.cookie(REFRESH_COOKIE, data.refreshToken, this.optionsCookie);
    delete data.refreshToken;
    return data;
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const data = await this.authService.login(dto);
    res.cookie(REFRESH_COOKIE, data.refreshToken, this.optionsCookie);
    delete data.refreshToken;
    return data;
  }

  @RefreshJwtGuard()
  @HttpCode(HttpStatus.OK)
  @Get('refresh')
  async refresh(
    @User('id') id: string,
    @Cookie(REFRESH_COOKIE) token: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } = await this.authService.refresh(
      token,
      id,
    );
    res.cookie(REFRESH_COOKIE, refreshToken, this.optionsCookie);
    return { accessToken };
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Get('logout')
  async logout(
    @Cookie(REFRESH_COOKIE) refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.authService.logout(refreshToken);
    res.clearCookie(REFRESH_COOKIE);
    return;
  }
}
