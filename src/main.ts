import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { ValidationPipe } from "@nestjs/common"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Configuración global de pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )

  // Configuración de CORS
  app.enableCors()

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle("Mi Finca API")
    .setDescription("API para gestión de actividades agrícolas, ganaderas y forestales")
    .setVersion("1.0")
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("api", app, document)

  await app.listen(3000)
  console.log(`Aplicación corriendo en: ${await app.getUrl()}`)
}
bootstrap()
