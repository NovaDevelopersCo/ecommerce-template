import { ConfigService } from '@nestjs/config';
import { ITelegramOptions } from 'src/notification/telegram/inteface/telegram.interface';

export const getTelegramConfig = (
  configService: ConfigService,
): ITelegramOptions => {
  const token = configService.get('TELEGRAM_TOKEN');
  return {
    token,
    chatId: configService.get('CHAT_ID'),
  };
};
