import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { CategoriasTransaccionService } from "./categorias-transaccion.service"
import { CategoriasTransaccionController } from "./categorias-transaccion.controller"
import { CategoriaTransaccion } from "./entities/categoria-transaccion.entity"

@Module({
  imports: [TypeOrmModule.forFeature([CategoriaTransaccion])],
  controllers: [CategoriasTransaccionController],
  providers: [CategoriasTransaccionService],
  exports: [CategoriasTransaccionService],
})
export class CategoriasTransaccionModule {}
