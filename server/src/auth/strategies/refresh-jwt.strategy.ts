import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import {
  REFRESH_JWT_STRATEGY,
  REFRESH_JWT_SECRET,
  REFRESH_COOKIE,
} from '../constants';
import { Request } from 'express';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  REFRESH_JWT_STRATEGY,
) {
  constructor(private readonly configService: ConfigService) {
    super({
      // * get token from cookies
      jwtFromRequest: RefreshJwtStrategy.fromCookie,
      secretOrKey: configService.get(REFRESH_JWT_SECRET),
    });
  }

  validate(payload) {
    return payload;
  }

  static fromCookie(req: Request) {
    const refreshToken = req.cookies[REFRESH_COOKIE];
    if (!refreshToken) return;
    return refreshToken;
  }
}
