import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { TiposEventoService } from "./tipos-evento.service"
import { TiposEventoController } from "./tipos-evento.controller"
import { TipoEvento } from "./entities/tipo-evento.entity"

@Module({
  imports: [TypeOrmModule.forFeature([TipoEvento])],
  controllers: [TiposEventoController],
  providers: [TiposEventoService],
  exports: [TiposEventoService],
})
export class TiposEventoModule {}
