import { Injectable } from '@nestjs/common';
import { Token } from './schemas/token.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '@modules/user/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ACCESS_JWT_SECRET, REFRESH_JWT_SECRET } from './constants';

@Injectable()
export class TokenService {
  constructor(
    @InjectModel(Token.name) private tokenModel: Model<Token>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  generateTokens({ _id, email, name, role }: User) {
    const payload = { id: _id, name, email, role };
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '30m',
      secret: this.configService.get(ACCESS_JWT_SECRET),
    });
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '15d',
      secret: this.configService.get(REFRESH_JWT_SECRET),
    });
    return { accessToken, refreshToken };
  }

  async saveToken(refreshToken: string, userId: string) {
    const tokenData = await this.tokenModel.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }

    const token = await this.tokenModel.create({
      refreshToken,
      user: userId,
    });
    return token;
  }

  async delete(id: string) {
    await this.tokenModel.deleteOne({ _id: id });
  }

  async byToken(refreshToken: string) {
    const token = await this.tokenModel.findOne({ refreshToken });
    return token;
  }
}
