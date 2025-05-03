import { IsString, IsNumber, IsPositive, IsDateString, IsObject, IsOptional } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class CreateReporteDto {
  @ApiProperty({
    description: "ID del proyecto",
    example: 1,
    required: true,
  })
  @IsNumber()
  @IsPositive()
  proyecto_id: number

  @ApiProperty({
    description: "ID del formato de reporte",
    example: 1,
    required: true,
  })
  @IsNumber()
  @IsPositive()
  formato_id: number

  @ApiProperty({
    description: "Título del reporte",
    example: "Reporte Financiero Mayo 2023",
    required: true,
  })
  @IsString()
  titulo: string

  @ApiProperty({
    description: "Fecha de inicio del período del reporte",
    example: "2023-05-01",
    required: true,
  })
  @IsDateString()
  fecha_inicio: string

  @ApiProperty({
    description: "Fecha de fin del período del reporte",
    example: "2023-05-31",
    required: true,
  })
  @IsDateString()
  fecha_fin: string

  @ApiProperty({
    description: "Datos del reporte en formato JSON",
    example: {
      ingresos: [
        { fecha: "2023-05-10", monto: 500000, categoria: "Venta de huevos" },
        { fecha: "2023-05-20", monto: 300000, categoria: "Venta de pollos" },
      ],
      egresos: [
        { fecha: "2023-05-05", monto: 200000, categoria: "Compra de alimento" },
        { fecha: "2023-05-15", monto: 100000, categoria: "Medicamentos" },
      ],
      balance: 500000,
    },
    required: true,
  })
  @IsObject()
  datos: object

  @ApiProperty({
    description: "URL del archivo del reporte",
    example: "https://storage.example.com/reportes/reporte-mayo-2023.pdf",
    required: false,
  })
  @IsString()
  @IsOptional()
  archivo_url?: string
}
