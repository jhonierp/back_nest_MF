import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsuariosModule } from './usuarios/usuarios.module';
import { RolesModule } from './roles/roles.module';
import { ModulosModule } from './modulos/modulos.module';
import { SubmodulosModule } from './submodulos/submodulos.module';
import { ProyectosModule } from './proyectos/proyectos.module';
import { ParametrosProyectoModule } from './parametros-proyecto/parametros-proyecto.module';

import { TareasModule } from './tareas/tareas.module';
import { TiposEventoModule } from './tipos-evento/tipos-evento.module';
import { EventosModule } from './eventos/eventos.module';
import { CategoriasTransaccionModule } from './categorias-transaccion/categorias-transaccion.module';
import { TransaccionesModule } from './transacciones/transacciones.module';
import { FormatosReporteModule } from './formatos-reporte/formatos-reporte.module';
import { ReportesModule } from './reportes/reportes.module';
import { NotificacionesModule } from './notificaciones/notificaciones.module';
import { AlertasInteligentesModule } from './alertas-inteligentes/alertas-inteligentes.module';
import { ForoComentariosModule } from './foro-comentarios/foro-comentarios.module';
import { SoporteTecnicoModule } from './soporte-tecnico/soporte-tecnico.module';

import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 3306),
        username: configService.get('DB_USERNAME', 'root'),
        password: configService.get('DB_PASSWORD', 'admin'),
        database: configService.get('DB_DATABASE', 'mf_db'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: configService.get<boolean>('DB_SYNCHRONIZE', false),
      }),
    }),
    UsuariosModule,
    RolesModule,
    ModulosModule,
    SubmodulosModule,
    ProyectosModule,
    ParametrosProyectoModule,

    TareasModule,
    TiposEventoModule,
    EventosModule,
    CategoriasTransaccionModule,
    TransaccionesModule,
    FormatosReporteModule,
    ReportesModule,
    NotificacionesModule,
    AlertasInteligentesModule,
    ForoComentariosModule,
    SoporteTecnicoModule,

    AuthModule,
  ],
})
export class AppModule {}
