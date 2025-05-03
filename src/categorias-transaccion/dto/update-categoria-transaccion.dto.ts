import { PartialType } from "@nestjs/swagger"
import { CreateCategoriaTransaccionDto } from "./create-categoria-transaccion.dto"

export class UpdateCategoriaTransaccionDto extends PartialType(CreateCategoriaTransaccionDto) {}
