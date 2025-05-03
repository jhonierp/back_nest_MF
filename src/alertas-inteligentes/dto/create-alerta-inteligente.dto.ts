import { IsString, IsNumber, IsPositive, IsBoolean, IsOptional } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class CreateAlertaInteligenteDto {
  @ApiProperty({
    description: "ID del proyecto",
    example: 1,
    required: true,
  })
  @IsNumber()
  @IsPositive()
  proyecto_id: number

  @ApiProperty({
    description: "Nombre de la alerta",
    example: "Alerta de temperatura alta",
    required: true,
  })
  @IsString()
  nombre: string

  @ApiProperty({
    description: "Condición de la alerta (formato JSON)",
    example: '{"parametro": "temperatura", "operador": ">", "valor": 30}',
    required: true,
  })
  @IsString()
  condicion: string

  @ApiProperty({
    description: "Mensaje de la alerta",
    example: "La temperatura ha superado los 30°C, verifique la ventilación",
    required: true,
  })
  @IsString()
  mensaje: string

  @ApiProperty({
    description: "Indica si la alerta está activa",
    example: true,
    default: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  activa?: boolean = true
}
