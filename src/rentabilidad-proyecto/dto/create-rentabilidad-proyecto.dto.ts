import { IsNumber, IsPositive, IsDateString } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class CreateRentabilidadProyectoDto {
  @ApiProperty({
    description: "ID del proyecto",
    example: 1,
    required: true,
  })
  @IsNumber()
  @IsPositive()
  proyecto_id: number

  @ApiProperty({
    description: "Fecha del cálculo de rentabilidad",
    example: "2023-05-15",
    required: true,
  })
  @IsDateString()
  fecha: string

  @ApiProperty({
    description: "Inversión inicial",
    example: 5000000,
    required: true,
  })
  @IsNumber()
  @IsPositive()
  inversion_inicial: number

  @ApiProperty({
    description: "Ingresos totales",
    example: 12000000,
    required: true,
  })
  @IsNumber()
  @IsPositive()
  ingresos_totales: number

  @ApiProperty({
    description: "Egresos totales",
    example: 7000000,
    required: true,
  })
  @IsNumber()
  @IsPositive()
  egresos_totales: number
}
