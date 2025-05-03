import { PartialType } from "@nestjs/swagger"
import { CreateForoComentarioDto } from "./create-foro-comentario.dto"

export class UpdateForoComentarioDto extends PartialType(CreateForoComentarioDto) {}
