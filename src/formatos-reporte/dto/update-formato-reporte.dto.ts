import { PartialType } from "@nestjs/swagger"
import { CreateFormatoReporteDto } from "./create-formato-reporte.dto"

export class UpdateFormatoReporteDto extends PartialType(CreateFormatoReporteDto) {}
