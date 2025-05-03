import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ForoComentariosService } from "./foro-comentarios.service"
import { ForoComentariosController } from "./foro-comentarios.controller"
import { ForoComentario } from "./entities/foro-comentario.entity"
import { UsuariosModule } from "../usuarios/usuarios.module"
import { ModulosModule } from "../modulos/modulos.module"

@Module({
  imports: [TypeOrmModule.forFeature([ForoComentario]), UsuariosModule, ModulosModule],
  controllers: [ForoComentariosController],
  providers: [ForoComentariosService],
  exports: [ForoComentariosService],
})
export class ForoComentariosModule {}
