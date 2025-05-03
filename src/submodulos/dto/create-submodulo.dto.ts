import { IsString, IsNumber, IsPositive } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class CreateSubmoduloDto {
  @ApiProperty({
    description: "Nombre del submódulo",
    example: "Gallinas Ponedoras",
    required: true,
  })
  @IsString()
  nombre: string

  @ApiProperty({
    description: "ID del módulo al que pertenece",
    example: 1,
    required: true,
  })
  @IsNumber()
  @IsPositive()
  modulo_id: number
}
