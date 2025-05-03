import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Req,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ForoComentariosService } from './foro-comentarios.service';
import { CreateForoComentarioDto } from './dto/create-foro-comentario.dto';
import { UpdateForoComentarioDto } from './dto/update-foro-comentario.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { PaginationDto } from '../common/dto/pagination.dto';

@ApiTags('Foro de Comentarios')
@Controller('foro-comentarios')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ForoComentariosController {
  constructor(
    private readonly foroComentariosService: ForoComentariosService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo comentario' })
  @ApiResponse({ status: 201, description: 'Comentario creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  create(
    @Body() createForoComentarioDto: CreateForoComentarioDto,
    @Req() req: any,
  ) {
    return this.foroComentariosService.create(
      createForoComentarioDto,
      req.user,
    );
  }

  @Get('modulo/:moduloId')
  @ApiOperation({ summary: 'Obtener comentarios por módulo' })
  @ApiResponse({ status: 200, description: 'Lista de comentarios del módulo' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'Módulo no encontrado' })
  findByModulo(
    @Param('moduloId') moduloId: string,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.foroComentariosService.findByModulo(+moduloId, paginationDto);
  }

  @Get('respuestas/:comentarioId')
  @ApiOperation({ summary: 'Obtener respuestas a un comentario' })
  @ApiResponse({
    status: 200,
    description: 'Lista de respuestas al comentario',
  })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'Comentario no encontrado' })
  findRespuestas(
    @Param('comentarioId') comentarioId: string,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.foroComentariosService.findRespuestas(
      +comentarioId,
      paginationDto,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un comentario por ID' })
  @ApiResponse({ status: 200, description: 'Comentario encontrado' })
  @ApiResponse({ status: 404, description: 'Comentario no encontrado' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  findOne(@Param('id') id: string) {
    return this.foroComentariosService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un comentario' })
  @ApiResponse({
    status: 200,
    description: 'Comentario actualizado exitosamente',
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 404, description: 'Comentario no encontrado' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Prohibido - No tiene permisos' })
  update(
    @Param('id') id: string,
    @Body() updateForoComentarioDto: UpdateForoComentarioDto,
    @Req() req,
  ) {
    return this.foroComentariosService.update(
      +id,
      updateForoComentarioDto,
      req.user,
    );
  }

  @Patch(':id/like')
  @ApiOperation({ summary: 'Dar like a un comentario' })
  @ApiResponse({ status: 200, description: 'Like registrado exitosamente' })
  @ApiResponse({ status: 404, description: 'Comentario no encontrado' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  darLike(@Param('id') id: string) {
    return this.foroComentariosService.darLike(+id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un comentario' })
  @ApiResponse({
    status: 200,
    description: 'Comentario eliminado exitosamente',
  })
  @ApiResponse({ status: 404, description: 'Comentario no encontrado' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Prohibido - No tiene permisos' })
  remove(@Param('id') id: string, @Req() req) {
    return this.foroComentariosService.remove(+id, req.user);
  }
}
