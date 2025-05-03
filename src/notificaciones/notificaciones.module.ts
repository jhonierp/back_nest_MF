import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { NotificacionesService } from "./notificaciones.service"
import { NotificacionesController } from "./notificaciones.controller"
import { Notificacion } from "./entities/notificacion.entity"
import { UsuariosModule } from "../usuarios/usuarios.module"

@Module({
  imports: [TypeOrmModule.forFeature([Notificacion]), UsuariosModule],
  controllers: [NotificacionesController],
  providers: [NotificacionesService],
  exports: [NotificacionesService],
})
export class NotificacionesModule {}
