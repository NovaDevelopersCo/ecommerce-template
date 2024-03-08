import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { IMail } from './interfaces/mail.interface';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private configService: ConfigService
  ) {}

  async emailSend<T>(mailData:IMail<T>) {
    const urlConfirmAddress = this.configService.get<string>(
      'URL_CONFIRM_ADDRESS',
    );

    return this.mailerService.sendMail({
      to: mailData.to,
      subject: mailData.subject,
      template: join(__dirname, '/../templates', mailData.template),
      context: mailData.context
    }).catch((e) => {
      throw new HttpException(
        `Ошибка работы почты: ${JSON.stringify(e)}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    });
  }
}