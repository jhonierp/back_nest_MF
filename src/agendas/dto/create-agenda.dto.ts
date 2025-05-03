import { IsNumber, IsPositive, IsDateString, IsEnum, IsOptional, ValidateIf } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class CreateAgendaDto {
  @ApiProperty({
    description: "ID del proyecto",
    example: 1,
    required: true,
  })
  @IsNumber()
  @IsPositive()
  proyecto_id: number

  @ApiProperty({
    description: "Fecha de la agenda",
    example: "2023-05-15",
    required: true,
  })
  @IsDateString()
  fecha: string

  @ApiProperty({
    description: "Tipo de agenda",
    enum: ["tarea", "evento"],
    example: "tarea",
    required: true,
  })
  @IsEnum(["tarea", "evento"])
  tipo: string

  @ApiProperty({
    description: "ID de la tarea (si tipo es 'tarea')",
    example: 1,
    required: false,
  })
  @IsNumber()
  @IsPositive()
  @ValidateIf((o) => o.tipo === "tarea")
  @IsOptional()
  tarea_id?: number

  @ApiProperty({
    description: "ID del evento (si tipo es 'evento')",
    example: 1,
    required: false,
  })
  @IsNumber()
  @IsPositive()
  @ValidateIf((o) => o.tipo === "evento")
  @IsOptional()
  evento_id?: number
}
