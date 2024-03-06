import { DocumentBuilder } from '@nestjs/swagger';

export const configSwagger = new DocumentBuilder()
  .setTitle('API Ecommerce-template')
  .setDescription('The Ecommerce-template description')
  .setVersion('1.0')
  .build();
