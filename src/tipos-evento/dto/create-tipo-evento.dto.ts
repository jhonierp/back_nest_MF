import { IsString } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class CreateTipoEventoDto {
  @ApiProperty({
    description: "Nombre del tipo de evento",
    example: "Vacunación",
    required: true,
  })
  @IsString()
  nombre: string
}
