import { PartialType } from "@nestjs/swagger"
import { CreateParametroProyectoDto } from "./create-parametro-proyecto.dto"

export class UpdateParametroProyectoDto extends PartialType(CreateParametroProyectoDto) {}
