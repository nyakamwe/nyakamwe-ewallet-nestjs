import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe, Logger } from '@nestjs/common';

const logger = new Logger('Main'); 

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

  app.useGlobalPipes(new ValidationPipe())  // Enable the use of validation pipe globally
  
  await app.listen(process.env.PORT ? parseInt(process.env.PORT) : 3000, ()=>{
    logger.log(
      `API running on port: ${process.env.PORT}, environment: ${process.env.NODE_ENV} `,
    )
  });
}
bootstrap();
