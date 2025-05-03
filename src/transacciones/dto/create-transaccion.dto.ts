import { IsString, IsNumber, IsPositive, IsDateString, IsOptional } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class CreateTransaccionDto {
  @ApiProperty({
    description: "ID del proyecto",
    example: 1,
    required: true,
  })
  @IsNumber()
  @IsPositive()
  proyecto_id: number

  @ApiProperty({
    description: "ID de la categoría",
    example: 1,
    required: true,
  })
  @IsNumber()
  @IsPositive()
  categoria_id: number

  @ApiProperty({
    description: "Monto de la transacción",
    example: 150000,
    required: true,
  })
  @IsNumber()
  @IsPositive()
  monto: number

  @ApiProperty({
    description: "Fecha de la transacción",
    example: "2023-05-15",
    required: true,
  })
  @IsDateString()
  fecha: string

  @ApiProperty({
    description: "Descripción de la transacción",
    example: "Compra de alimento para aves",
    required: false,
  })
  @IsString()
  @IsOptional()
  descripcion?: string

  @ApiProperty({
    description: "URL del comprobante",
    example: "https://storage.example.com/comprobantes/factura123.pdf",
    required: false,
  })
  @IsString()
  @IsOptional()
  comprobante_url?: string
}
