import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlertasInteligentesService } from './alertas-inteligentes.service';
import { AlertasInteligentesController } from './alertas-inteligentes.controller';
import { AlertaInteligente } from './entities/alerta-inteligente.entity';
import { ProyectosModule } from '../proyectos/proyectos.module';

@Module({
  imports: [TypeOrmModule.forFeature([AlertaInteligente]), ProyectosModule],
  controllers: [AlertasInteligentesController],
  providers: [AlertasInteligentesService],
  exports: [AlertasInteligentesService],
})
export class AlertasInteligentesModule {}
