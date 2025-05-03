import { IsString, IsNumber, IsPositive, IsDateString, IsOptional } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class CreateProyectoDto {
  @ApiProperty({
    description: "Nombre del proyecto",
    example: "Granja Las Palmas",
    required: true,
  })
  @IsString()
  nombre: string

  @ApiProperty({
    description: "Ubicación del proyecto",
    example: "Vereda El Rosal, Municipio de Medellín",
    required: false,
  })
  @IsString()
  @IsOptional()
  ubicacion?: string

  @ApiProperty({
    description: "Fecha de inicio del proyecto",
    example: "2023-01-15",
    required: true,
  })
  @IsDateString()
  fecha_inicio: string

  @ApiProperty({
    description: "ID del módulo",
    example: 1,
    required: true,
  })
  @IsNumber()
  @IsPositive()
  modulo_id: number

  @ApiProperty({
    description: "ID del submódulo",
    example: 1,
    required: true,
  })
  @IsNumber()
  @IsPositive()
  submodulo_id: number
}
