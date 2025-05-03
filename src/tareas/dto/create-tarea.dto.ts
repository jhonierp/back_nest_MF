import { IsString, IsNumber, IsPositive, IsDateString, IsBoolean, IsOptional } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class CreateTareaDto {
  @ApiProperty({
    description: "ID del proyecto",
    example: 1,
    required: true,
  })
  @IsNumber()
  @IsPositive()
  proyecto_id: number

  @ApiProperty({
    description: "Título de la tarea",
    example: "Alimentar gallinas",
    required: true,
  })
  @IsString()
  titulo: string

  @ApiProperty({
    description: "Descripción de la tarea",
    example: "Suministrar 50kg de alimento balanceado",
    required: false,
  })
  @IsString()
  @IsOptional()
  descripcion?: string

  @ApiProperty({
    description: "Fecha de la tarea",
    example: "2023-05-15",
    required: true,
  })
  @IsDateString()
  fecha: string

  @ApiProperty({
    description: "Indica si se debe enviar recordatorio",
    example: true,
    default: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  recordatorio?: boolean = true
}
