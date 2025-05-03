import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { FormatosReporteService } from "./formatos-reporte.service"
import { FormatosReporteController } from "./formatos-reporte.controller"
import { FormatoReporte } from "./entities/formato-reporte.entity"

@Module({
  imports: [TypeOrmModule.forFeature([FormatoReporte])],
  controllers: [FormatosReporteController],
  providers: [FormatosReporteService],
  exports: [FormatosReporteService],
})
export class FormatosReporteModule {}
