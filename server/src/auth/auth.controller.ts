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
import {
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ResponseOK, ResponseRefresh } from './interface/swagger';

@ApiTags('auth')
@UsePipes(new ValidationPipe({ whitelist: true }))
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  private optionsCookie: CookieOptions = {
    httpOnly: true,
    maxAge: 15 * 24 * 60 * 60 * 1000,
    path: '/',
  };

  @ApiOkResponse({
    type: ResponseOK,
    description: `set cookie ${REFRESH_COOKIE}`,
  })
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

  @ApiOkResponse({
    type: ResponseOK,
    description: `set cookie ${REFRESH_COOKIE}`,
  })
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

  @ApiOkResponse({
    type: ResponseRefresh,
    description: `set new  ${REFRESH_COOKIE}`,
  })
  @ApiUnauthorizedResponse({ description: 'No valid token' })
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

  @ApiNoContentResponse({ description: `delete key ${REFRESH_COOKIE} cookie` })
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
