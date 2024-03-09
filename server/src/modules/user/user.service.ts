import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { MailService } from 'src/notification/mail/mail.service';
import { IMail, IEmailUser } from 'src/notification/mail/interfaces';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private mailService:MailService
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

  async sendConfirmMail(user: IEmailUser) {
    const mailContent:IMail<IEmailUser> = {
      to: user.email,
      subject: 'Confirm registration', //Example
      template: 'confirmReg',
      context: {
        email: user.email,
        name: user.name,
        phone: user.phone
      }
    }
    this.mailService.emailSend(mailContent)
  }
}
