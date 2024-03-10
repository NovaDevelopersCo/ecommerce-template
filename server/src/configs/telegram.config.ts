import { ConfigService } from "@nestjs/config";
import { ITelegramOptions } from "src/telegram/inteface/telegram.interface";

export const getTelegramConfig = (configService:ConfigService):ITelegramOptions => {
  const token = configService.get('TELEGRAM_TOKEN')
  if(!token) {
    throw new Error('Telegram token is undefined')
  }
  return {
    token,
    chatId: configService.get('CHAT_ID') ?? ''
  }
}