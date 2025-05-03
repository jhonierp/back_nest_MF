import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ParametrosProyectoService } from "./parametros-proyecto.service"
import { ParametrosProyectoController } from "./parametros-proyecto.controller"
import { ParametroProyecto } from "./entities/parametro-proyecto.entity"
import { ProyectosModule } from "../proyectos/proyectos.module"

@Module({
  imports: [TypeOrmModule.forFeature([ParametroProyecto]), ProyectosModule],
  controllers: [ParametrosProyectoController],
  providers: [ParametrosProyectoService],
  exports: [ParametrosProyectoService],
})
export class ParametrosProyectoModule {}
