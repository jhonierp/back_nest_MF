import { IsString } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class CreateRolDto {
  @ApiProperty({
    description: "Nombre del rol",
    example: "usuario_pro",
    required: true,
  })
  @IsString()
  nombre: string
}
