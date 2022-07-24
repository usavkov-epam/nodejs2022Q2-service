import { readFile } from 'fs/promises';
import { join } from 'path';
import { cwd } from 'process';

import 'dotenv/config';

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { parse } from 'yaml';

import { AppModule } from './app.module';

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const filepath = join(cwd(), 'doc', 'api.yaml');
  const document = await readFile(filepath, 'utf-8').then(parse);

  SwaggerModule.setup('doc', app, document);

  await app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
  });
}

bootstrap();
