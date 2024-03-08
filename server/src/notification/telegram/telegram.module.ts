import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { ITelegramModuleAsynOptions } from './inteface/telegram.interface';
import { TELEGRAM_MODULE_OPTIONS } from './telegram.constants';

@Global()
@Module({})
export class TelegramModule {
  static forRootAsync(options: ITelegramModuleAsynOptions):DynamicModule {
    const asyncOptions = this.createAsyncOptionsProvder(options)
    return {
      module: TelegramModule,
      imports: options.imports,
      providers: [TelegramService, asyncOptions],
      exports: [TelegramService]
    }
  }

  private static createAsyncOptionsProvder(options: ITelegramModuleAsynOptions):Provider {
    return {
      provide:TELEGRAM_MODULE_OPTIONS,
      useFactory: async(...args:any[]) => {
        const config = await options.useFactory(...args)
        return config
      },
      inject: options.inject || []
    }
  }
}