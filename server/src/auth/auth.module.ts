import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/modules/user/user.module';
import { Token, TokenSchema } from './schemas/token.schema';
import { TokenService } from './token.service';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { AccessJwtStrategy, RefreshJwtStrategy } from './strategies';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [AuthService, TokenService, AccessJwtStrategy, RefreshJwtStrategy],
})
export class AuthModule {}
