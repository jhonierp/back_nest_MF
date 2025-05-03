import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateForoComentarioDto } from './dto/create-foro-comentario.dto';
import { UpdateForoComentarioDto } from './dto/update-foro-comentario.dto';
import { ForoComentario } from './entities/foro-comentario.entity';
import { UsuariosService } from '../usuarios/usuarios.service';
import { ModulosService } from '../modulos/modulos.service';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class ForoComentariosService {
  constructor(
    @InjectRepository(ForoComentario)
    private readonly comentarioRepository: Repository<ForoComentario>,
    private readonly usuariosService: UsuariosService,
    private readonly modulosService: ModulosService,
  ) {}

  async create(
    createComentarioDto: CreateForoComentarioDto,
    user: any,
  ): Promise<ForoComentario> {
    // Verificar que el módulo existe
    await this.modulosService.findOne(createComentarioDto.modulo_id);

    // Si es una respuesta, verificar que el comentario padre existe
    if (createComentarioDto.comentario_padre_id) {
      await this.findOne(createComentarioDto.comentario_padre_id);
    }

    const comentario = this.comentarioRepository.create({
      ...createComentarioDto,
      usuario_id: user.id,
    });
    return this.comentarioRepository.save(comentario);
  }

  async findByModulo(moduloId: number, paginationDto: PaginationDto) {
    // Verificar que el módulo existe
    await this.modulosService.findOne(moduloId);

    const { page, limit } = paginationDto;
    const skip = (page - 1) * limit;

    const [comentarios, total] = await this.comentarioRepository.findAndCount({
      where: { modulo_id: moduloId, comentario_padre_id: null },
      skip,
      take: limit,
      relations: ['usuario'],
      order: { createdAt: 'DESC' },
      withDeleted: false,
    });

    return {
      data: comentarios,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findRespuestas(comentarioId: number, paginationDto: PaginationDto) {
    // Verificar que el comentario padre existe
    await this.findOne(comentarioId);

    const { page, limit } = paginationDto;
    const skip = (page - 1) * limit;

    const [respuestas, total] = await this.comentarioRepository.findAndCount({
      where: { comentario_padre_id: comentarioId },
      skip,
      take: limit,
      relations: ['usuario'],
      order: { createdAt: 'ASC' },
      withDeleted: false,
    });

    return {
      data: respuestas,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number): Promise<ForoComentario> {
    const comentario = await this.comentarioRepository.findOne({
      where: { id },
      relations: ['usuario', 'modulo'],
      withDeleted: false,
    });

    if (!comentario) {
      throw new NotFoundException(`Comentario con ID ${id} no encontrado`);
    }

    return comentario;
  }

  async update(
    id: number,
    updateComentarioDto: UpdateForoComentarioDto,
    user: any,
  ): Promise<ForoComentario> {
    const comentario = await this.findOne(id);

    // Verificar que el usuario es el autor del comentario o es admin
    const isAdmin = user.roles.some((rol) => rol.nombre === 'admin');
    if (!isAdmin && comentario.usuario_id !== user.id) {
      throw new ForbiddenException(
        'No tienes permiso para actualizar este comentario',
      );
    }

    // Si se actualiza el módulo, verificar que existe
    if (updateComentarioDto.modulo_id) {
      await this.modulosService.findOne(updateComentarioDto.modulo_id);
    }

    // No permitir cambiar el usuario_id
    delete updateComentarioDto['usuario_id'];

    Object.assign(comentario, updateComentarioDto);
    return this.comentarioRepository.save(comentario);
  }

  async darLike(id: number): Promise<ForoComentario> {
    const comentario = await this.findOne(id);

    comentario.likes += 1;
    return this.comentarioRepository.save(comentario);
  }

  async remove(id: number, user: any): Promise<void> {
    const comentario = await this.findOne(id);

    // Verificar que el usuario es el autor del comentario o es admin
    const isAdmin = user.roles.some((rol) => rol.nombre === 'admin');
    if (!isAdmin && comentario.usuario_id !== user.id) {
      throw new ForbiddenException(
        'No tienes permiso para eliminar este comentario',
      );
    }

    await this.comentarioRepository.softRemove(comentario);
  }
}
