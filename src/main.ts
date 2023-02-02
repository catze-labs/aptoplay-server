import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { PrismaService } from "./services/prisma/prisma.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  if (process.env.ENVIRONMENT !== "prod") {
    const config = new DocumentBuilder()
      .setTitle("AptoPlay BE API")
      .setDescription("Aptos Seoul Hack 2023 Buidle - AptoPlay Server")
      .setVersion("0.1")
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("docs", app, document);
  }

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true
      }
    })
  );

  app.enableCors({
    origin: "*"
  });

  await app.listen(process.env.PORT);
}
bootstrap();
