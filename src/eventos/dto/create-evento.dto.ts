import { IsString, IsNumber, IsPositive, IsDateString, IsBoolean, IsOptional } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class CreateEventoDto {
  @ApiProperty({
    description: "ID del proyecto",
    example: 1,
    required: true,
  })
  @IsNumber()
  @IsPositive()
  proyecto_id: number

  @ApiProperty({
    description: "ID del tipo de evento",
    example: 1,
    required: true,
  })
  @IsNumber()
  @IsPositive()
  tipo_evento_id: number

  @ApiProperty({
    description: "Descripción del evento",
    example: "Vacunación de aves contra Newcastle",
    required: true,
  })
  @IsString()
  descripcion: string

  @ApiProperty({
    description: "Fecha del evento",
    example: "2023-05-15",
    required: true,
  })
  @IsDateString()
  fecha_evento: string

  @ApiProperty({
    description: "Indica si el evento tiene un gasto asociado",
    example: true,
    default: false,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  tiene_gasto?: boolean = false

  @ApiProperty({
    description: "ID del gasto asociado (si tiene_gasto es true)",
    example: 1,
    required: false,
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  gasto_id?: number
}
