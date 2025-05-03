import { IsString, IsEnum, IsOptional } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class CreateCategoriaTransaccionDto {
  @ApiProperty({
    description: "Nombre de la categoría",
    example: "Venta de huevos",
    required: true,
  })
  @IsString()
  nombre: string

  @ApiProperty({
    description: "Tipo de categoría",
    enum: ["ingreso", "egreso"],
    example: "ingreso",
    required: true,
  })
  @IsEnum(["ingreso", "egreso"])
  tipo: string

  @ApiProperty({
    description: "Descripción de la categoría",
    example: "Ingresos por venta de huevos",
    required: false,
  })
  @IsString()
  @IsOptional()
  descripcion?: string
}
