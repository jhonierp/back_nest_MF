import { IsString, IsNumber, IsPositive, IsEnum, IsOptional, IsBoolean } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class CreateNotificacionDto {
  @ApiProperty({
    description: "ID del usuario destinatario",
    example: 1,
    required: true,
  })
  @IsNumber()
  @IsPositive()
  usuario_id: number

  @ApiProperty({
    description: "Título de la notificación",
    example: "Recordatorio de tarea",
    required: true,
  })
  @IsString()
  titulo: string

  @ApiProperty({
    description: "Mensaje de la notificación",
    example: "Mañana debe realizar la vacunación de las aves",
    required: true,
  })
  @IsString()
  mensaje: string

  @ApiProperty({
    description: "Tipo de notificación",
    enum: ["sistema", "alerta", "recordatorio", "informacion"],
    example: "recordatorio",
    required: true,
  })
  @IsEnum(["sistema", "alerta", "recordatorio", "informacion"])
  tipo: string

  @ApiProperty({
    description: "Indica si la notificación ha sido leída",
    example: false,
    default: false,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  leida?: boolean = false
}
