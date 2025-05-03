import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ReportesService } from "./reportes.service"
import { ReportesController } from "./reportes.controller"
import { Reporte } from "./entities/reporte.entity"
import { ProyectosModule } from "../proyectos/proyectos.module"
import { FormatosReporteModule } from "../formatos-reporte/formatos-reporte.module"

@Module({
  imports: [TypeOrmModule.forFeature([Reporte]), ProyectosModule, FormatosReporteModule],
  controllers: [ReportesController],
  providers: [ReportesService],
  exports: [ReportesService],
})
export class ReportesModule {}
