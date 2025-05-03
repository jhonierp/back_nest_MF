import { IsString } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class CreateModuloDto {
  @ApiProperty({
    description: "Nombre del módulo",
    example: "Avicultura",
    required: true,
  })
  @IsString()
  nombre: string
}
