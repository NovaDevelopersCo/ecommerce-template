import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly mailerService: MailerService,
    private configService: ConfigService
  ) {}

  async byEmail(email: string) {
    const user = await this.userModel.findOne({ email });
    return user;
  }

  async create(dto: CreateUserDto) {
    const user = await this.userModel.create({ ...dto });
    return user;
  }

  async byId(id: string) {
    const user = await this.userModel.findById(id);
    return user;
  }

  async sendConfirmMail(user: CreateUserDto) {
    const urlConfirmAddress = this.configService.get<string>(
      'URL_CONFIRM_ADDRESS',
    );
    
    return await this.mailerService
      .sendMail({
        to: user.email,
        subject: 'Подтверждение регистрации',
        template: join(__dirname, '/../templates', 'confirmReg'),
        context: {
          email: user.email,
          username: user.name,
          urlConfirmAddress,
        },
      })
      .catch((e) => {
        throw new HttpException(
          `Ошибка работы почты: ${JSON.stringify(e)}`,
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      });
  }
}
