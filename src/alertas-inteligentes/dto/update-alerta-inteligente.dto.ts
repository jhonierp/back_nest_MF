import { PartialType } from "@nestjs/swagger"
import { CreateAlertaInteligenteDto } from "./create-alerta-inteligente.dto"

export class UpdateAlertaInteligenteDto extends PartialType(CreateAlertaInteligenteDto) {}
