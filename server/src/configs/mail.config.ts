import { ConfigService } from '@nestjs/config';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { join } from 'path';

export const getMailConfig = async (
  configService: ConfigService,
): Promise<any> => {
  const mailFromName = configService.get<string>('MAIL_FROM_NAME');
  const mailFromAddress = configService.get<string>('MAIL_FROM_EMAIL');

  return {
    transport:{
      host: configService.get<string>('MAIL_HOST'),
      port: 465,
      secure: true,
      auth: {
        user: configService.get<string>('MAIL_USER'),
        pass: configService.get<string>('MAIL_PASS'),
      }
    },
    defaults: {
      from: `"${mailFromName}" <${mailFromAddress}>`,
    },
    template: {
      dir: join(__dirname, '/../templates'),
      adapter: new EjsAdapter(),
      options: {
        strict: false,
      },
    },
  };
};