import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';

const port = process.env.PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  process.env.TZ = 'UTC';
  /**
   * Helmet pode ajudar a proteger seu aplicativo de alguns
   * vulnerabilidades da web configurando cabeçalhos HTTP de forma adequada.
   * Geralmente, o Helmet é apenas uma coleção de 12
   * funções de middleware que definem cabeçalhos HTTP relacionados à segurança
   *
   * https://github.com/helmetjs/helmet#how-it-works
   */
  app.use(helmet());

  app.enableCors();

  /**
   * Para proteger seus aplicativos de ataques de força bruta
   */
  app.use(
    new rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
    }),
  );

  /**
   * Aplicar validação para todas as entradas globalmente
   */
  app.useGlobalPipes(
    new ValidationPipe({
      /**
       * Remova todas as propriedades existentes não-objeto
       */
      whitelist: true,
      /***
       * Transforme objetos de entrada em seus objetos DTO correspondentes
       */
      transform: true,
    }),
  );

  await app.listen(port);

  Logger.log(`Server started running on http://localhost:${port}`, 'Bootstrap');
}

bootstrap();
