import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  ["https://aptoplay-web.vercel.app", "http://localhost:3000"];
  app.enableCors({
    origin:
      process.env.ENVIRONMENT === "local"
        ? "*"
        : "https://aptoplay-web.vercel.app"
  });

  const config = new DocumentBuilder()
    .setTitle("AptoPlay BE API")
    .setDescription("Aptos Seoul Hack 2023 Buidle - AptoPlay Server")
    .setVersion("0.1")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true
      }
    })
  );

  await app.listen(3000);
}
bootstrap();
