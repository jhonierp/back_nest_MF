import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ProyectosService } from "./proyectos.service"
import { ProyectosController } from "./proyectos.controller"
import { Proyecto } from "./entities/proyecto.entity"
import { UsuariosModule } from "../usuarios/usuarios.module"
import { ModulosModule } from "../modulos/modulos.module"
import { SubmodulosModule } from "../submodulos/submodulos.module"

@Module({
  imports: [TypeOrmModule.forFeature([Proyecto]), UsuariosModule, ModulosModule, SubmodulosModule],
  controllers: [ProyectosController],
  providers: [ProyectosService],
  exports: [ProyectosService],
})
export class ProyectosModule {}
