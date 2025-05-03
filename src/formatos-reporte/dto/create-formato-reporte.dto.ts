import { IsString, IsOptional } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class CreateFormatoReporteDto {
  @ApiProperty({
    description: "Nombre del formato de reporte",
    example: "Reporte Financiero Mensual",
    required: true,
  })
  @IsString()
  nombre: string

  @ApiProperty({
    description: "Estructura del formato (JSON)",
    example:
      '{"secciones": ["ingresos", "egresos", "balance"], "campos": {"ingresos": ["fecha", "monto", "categoria"]}}',
    required: true,
  })
  @IsString()
  estructura: string

  @ApiProperty({
    description: "Descripción del formato",
    example: "Formato para reportes financieros mensuales con desglose de ingresos y egresos",
    required: false,
  })
  @IsString()
  @IsOptional()
  descripcion?: string
}
