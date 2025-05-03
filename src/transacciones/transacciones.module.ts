import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { TransaccionesService } from "./transacciones.service"
import { TransaccionesController } from "./transacciones.controller"
import { Transaccion } from "./entities/transaccion.entity"
import { ProyectosModule } from "../proyectos/proyectos.module"
import { CategoriasTransaccionModule } from "../categorias-transaccion/categorias-transaccion.module"

@Module({
  imports: [TypeOrmModule.forFeature([Transaccion]), ProyectosModule, CategoriasTransaccionModule],
  controllers: [TransaccionesController],
  providers: [TransaccionesService],
  exports: [TransaccionesService],
})
export class TransaccionesModule {}
