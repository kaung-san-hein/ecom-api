import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  // Serve static files - serve uploads directory at root level
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));
  
  // Set global prefix for API routes only, not static files
  app.setGlobalPrefix('api/v1', {
    exclude: ['/uploads/(.*)'],
  });
  
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
