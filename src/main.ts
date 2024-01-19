import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('NYAKAMWE Tekana E-wallet')
    .setDescription('The implementation of tekana e-wallet using NestJs in Engineering Induction phase.')
    .setVersion('1.0')
    .addBearerAuth({
      type:"http",
      scheme:'bearer',
      bearerFormat:'JWT',
    } ,'access_token')
    // .addTag('Tekana')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  await app.listen(process.env.PORT ? parseInt(process.env.PORT) : 3000);
}
bootstrap();
