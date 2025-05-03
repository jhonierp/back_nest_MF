import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { SubmodulosService } from "./submodulos.service"
import { SubmodulosController } from "./submodulos.controller"
import { Submodulo } from "./entities/submodulo.entity"
import { ModulosModule } from "../modulos/modulos.module"

@Module({
  imports: [TypeOrmModule.forFeature([Submodulo]), ModulosModule],
  controllers: [SubmodulosController],
  providers: [SubmodulosService],
  exports: [SubmodulosService],
})
export class SubmodulosModule {}
