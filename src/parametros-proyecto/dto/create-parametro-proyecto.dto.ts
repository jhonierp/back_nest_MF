import { IsString, IsNumber, IsPositive, IsOptional } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class CreateParametroProyectoDto {
  @ApiProperty({
    description: "ID del proyecto",
    example: 1,
    required: true,
  })
  @IsNumber()
  @IsPositive()
  proyecto_id: number

  @ApiProperty({
    description: "Nombre del parámetro",
    example: "Temperatura",
    required: true,
  })
  @IsString()
  parametro_nombre: string

  @ApiProperty({
    description: "Valor del parámetro",
    example: "25°C",
    required: true,
  })
  @IsString()
  valor: string

  @ApiProperty({
    description: "Valor mínimo ideal",
    example: 20,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  ideal_min?: number

  @ApiProperty({
    description: "Valor máximo ideal",
    example: 30,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  ideal_max?: number

  @ApiProperty({
    description: "Descripción del parámetro",
    example: "Temperatura ambiente del galpón",
    required: false,
  })
  @IsString()
  @IsOptional()
  descripcion?: string
}
