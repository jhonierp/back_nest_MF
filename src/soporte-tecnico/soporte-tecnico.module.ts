import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { SoporteTecnicoService } from "./soporte-tecnico.service"
import { SoporteTecnicoController } from "./soporte-tecnico.controller"
import { SoporteTecnico } from "./entities/soporte-tecnico.entity"
import { UsuariosModule } from "../usuarios/usuarios.module"

@Module({
  imports: [TypeOrmModule.forFeature([SoporteTecnico]), UsuariosModule],
  controllers: [SoporteTecnicoController],
  providers: [SoporteTecnicoService],
  exports: [SoporteTecnicoService],
})
export class SoporteTecnicoModule {}
