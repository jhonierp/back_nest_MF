import { IsString, IsOptional } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class CreateSoporteTecnicoDto {
  @ApiProperty({
    description: "Asunto del ticket de soporte",
    example: "Problema con la creación de reportes",
    required: true,
  })
  @IsString()
  asunto: string

  @ApiProperty({
    description: "Mensaje detallado del problema",
    example: "Al intentar generar un reporte financiero, aparece un error de 'datos no disponibles'",
    required: true,
  })
  @IsString()
  mensaje: string

  @ApiProperty({
    description: "URL del archivo adjunto",
    example: "https://storage.example.com/adjuntos/captura-error.png",
    required: false,
  })
  @IsString()
  @IsOptional()
  adjunto_url?: string
}
