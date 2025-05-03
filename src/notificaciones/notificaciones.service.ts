import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNotificacionDto } from './dto/create-notificacion.dto';
import { UpdateNotificacionDto } from './dto/update-notificacion.dto';
import { Notificacion } from './entities/notificacion.entity';
import { UsuariosService } from '../usuarios/usuarios.service';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class NotificacionesService {
  constructor(
    @InjectRepository(Notificacion)
    private readonly notificacionRepository: Repository<Notificacion>,
    private readonly usuariosService: UsuariosService,
  ) {}

  async create(
    createNotificacionDto: CreateNotificacionDto,
  ): Promise<Notificacion> {
    // Verificar que el usuario existe
    await this.usuariosService.findOne(createNotificacionDto.usuario_id);

    const notificacion = this.notificacionRepository.create(
      createNotificacionDto,
    );
    return this.notificacionRepository.save(notificacion);
  }

  async findByUsuario(usuarioId: number, paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    const skip = (page - 1) * limit;

    const [notificaciones, total] =
      await this.notificacionRepository.findAndCount({
        where: { usuario_id: usuarioId },
        skip,
        take: limit,
        order: { createdAt: 'DESC' },
        withDeleted: false,
      });

    return {
      data: notificaciones,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number, user: any): Promise<Notificacion> {
    const notificacion = await this.notificacionRepository.findOne({
      where: { id },
      relations: ['usuario'],
      withDeleted: false,
    });

    if (!notificacion) {
      throw new NotFoundException(`Notificación con ID ${id} no encontrada`);
    }

    // Verificar que el usuario es el propietario de la notificación o es admin
    const isAdmin = user.roles.some((rol) => rol.nombre === 'admin');
    if (!isAdmin && notificacion.usuario_id !== user.id) {
      throw new ForbiddenException(
        'No tienes permiso para acceder a esta notificación',
      );
    }

    return notificacion;
  }

  async marcarComoLeida(id: number, user: any): Promise<Notificacion> {
    const notificacion = await this.findOne(id, user);

    notificacion.leida = true;
    return this.notificacionRepository.save(notificacion);
  }

  async update(
    id: number,
    updateNotificacionDto: UpdateNotificacionDto,
    user: any,
  ): Promise<Notificacion> {
    const notificacion = await this.findOne(id, user);

    // Solo admin puede actualizar notificaciones
    const isAdmin = user.roles.some((rol) => rol.nombre === 'admin');
    if (!isAdmin) {
      throw new ForbiddenException(
        'No tienes permiso para actualizar esta notificación',
      );
    }

    Object.assign(notificacion, updateNotificacionDto);
    return this.notificacionRepository.save(notificacion);
  }

  async remove(id: number, user: any): Promise<void> {
    const notificacion = await this.findOne(id, user);

    // Solo admin puede eliminar notificaciones
    const isAdmin = user.roles.some((rol) => rol.nombre === 'admin');
    if (!isAdmin) {
      throw new ForbiddenException(
        'No tienes permiso para eliminar esta notificación',
      );
    }

    await this.notificacionRepository.softRemove(notificacion);
  }
}
