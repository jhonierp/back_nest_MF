import { IsString, IsNumber, IsPositive, IsOptional } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class CreateForoComentarioDto {
  @ApiProperty({
    description: "ID del módulo",
    example: 1,
    required: true,
  })
  @IsNumber()
  @IsPositive()
  modulo_id: number

  @ApiProperty({
    description: "Título del comentario",
    example: "Consulta sobre alimentación de gallinas",
    required: true,
  })
  @IsString()
  titulo: string

  @ApiProperty({
    description: "Contenido del comentario",
    example: "¿Cuál es la mejor alimentación para gallinas ponedoras?",
    required: true,
  })
  @IsString()
  contenido: string

  @ApiProperty({
    description: "URL de la imagen adjunta",
    example: "https://storage.example.com/imagenes/foto-gallinas.jpg",
    required: false,
  })
  @IsString()
  @IsOptional()
  imagen_url?: string

  @ApiProperty({
    description: "ID del comentario padre (si es una respuesta)",
    example: 5,
    required: false,
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  comentario_padre_id?: number
}
