import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { EventosService } from "./eventos.service"
import { EventosController } from "./eventos.controller"
import { Evento } from "./entities/evento.entity"
import { ProyectosModule } from "../proyectos/proyectos.module"
import { TiposEventoModule } from "../tipos-evento/tipos-evento.module"

@Module({
  imports: [TypeOrmModule.forFeature([Evento]), ProyectosModule, TiposEventoModule],
  controllers: [EventosController],
  providers: [EventosService],
  exports: [EventosService],
})
export class EventosModule {}
