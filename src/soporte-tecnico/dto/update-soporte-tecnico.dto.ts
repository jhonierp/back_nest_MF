import { PartialType } from "@nestjs/swagger"
import { CreateSoporteTecnicoDto } from "./create-soporte-tecnico.dto"
import { IsEnum, IsString, IsOptional } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class UpdateSoporteTecnicoDto extends PartialType(CreateSoporteTecnicoDto) {
  @ApiProperty({
    description: "Estado del ticket de soporte",
    enum: ["abierto", "en_proceso", "resuelto", "cerrado"],
    example: "en_proceso",
    required: false,
  })
  @IsEnum(["abierto", "en_proceso", "resuelto", "cerrado"])
  @IsOptional()
  estado?: string

  @ApiProperty({
    description: "Respuesta al ticket de soporte",
    example: "Hemos identificado el problema y estamos trabajando en solucionarlo",
    required: false,
  })
  @IsString()
  @IsOptional()
  respuesta?: string
}
