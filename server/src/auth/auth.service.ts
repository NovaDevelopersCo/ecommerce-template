import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto, RegistrationDto } from './dto';
import { UserService } from '@modules/user/user.service';
import { compare, genSalt, hash } from 'bcrypt';
import { User } from '@modules/user/schemas/user.schema';
import { TokenService } from './token.service';
import { USER_ALREADY_EXISTS, USER_NOT_FOUND } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  async registration(dto: RegistrationDto) {
    const oldUser = await this.userService.byEmail(dto.email);
    if (oldUser) throw new BadRequestException(USER_ALREADY_EXISTS);

    const salt = await genSalt(8);
    const hashPassword = await hash(dto.password, salt);

    const user = await this.userService.create({
      ...dto,
      password: hashPassword,
    });

    return await this.generateAndSaveToken(user);
  }

  async login({ email, password }: LoginDto) {
    const user = await this.userService.byEmail(email);
    if (!user) throw new BadRequestException(USER_NOT_FOUND);

    const isMatch = await compare(password, user.password);
    if (!isMatch) throw new BadRequestException('Неверный пароль');

    return await this.generateAndSaveToken(user);
  }

  async refresh(refreshToken: string, userId: string) {
    const token = await this.tokenService.byToken(refreshToken);
    const user = await this.userService.byId(userId);
    if (!user || !token) throw new UnauthorizedException();
    await this.tokenService.delete(token._id);
    const data = await this.generateAndSaveToken(user);
    return data;
  }

  async logout(refreshToken: string) {
    if (!refreshToken) return;
    const token = await this.tokenService.byToken(refreshToken);
    if (!token) return;
    await this.tokenService.delete(token._id);
  }

  private async generateAndSaveToken(user: User) {
    const tokens = this.tokenService.generateTokens(user);
    await this.tokenService.saveToken(tokens.refreshToken, user._id);

    return {
      ...tokens,
      user: {
        email: user.email,
        id: user._id,
        role: user.role,
        name: user.name,
      },
    };
  }
}
