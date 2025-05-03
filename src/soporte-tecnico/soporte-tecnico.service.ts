import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSoporteTecnicoDto } from './dto/create-soporte-tecnico.dto';
import { UpdateSoporteTecnicoDto } from './dto/update-soporte-tecnico.dto';
import { SoporteTecnico } from './entities/soporte-tecnico.entity';
import { UsuariosService } from '../usuarios/usuarios.service';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class SoporteTecnicoService {
  constructor(
    @InjectRepository(SoporteTecnico)
    private readonly soporteRepository: Repository<SoporteTecnico>,
    private readonly usuariosService: UsuariosService,
  ) {}

  async create(
    createSoporteDto: CreateSoporteTecnicoDto,
    user: any,
  ): Promise<SoporteTecnico> {
    const soporte = this.soporteRepository.create({
      ...createSoporteDto,
      usuario_id: user.id,
      estado: 'abierto',
    });
    return this.soporteRepository.save(soporte);
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    const skip = (page - 1) * limit;

    const [soportes, total] = await this.soporteRepository.findAndCount({
      skip,
      take: limit,
      relations: ['usuario'],
      order: { createdAt: 'DESC' },
      withDeleted: false,
    });

    return {
      data: soportes,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findByUsuario(usuarioId: number, paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    const skip = (page - 1) * limit;

    const [soportes, total] = await this.soporteRepository.findAndCount({
      where: { usuario_id: usuarioId },
      skip,
      take: limit,
      order: { createdAt: 'DESC' },
      withDeleted: false,
    });

    return {
      data: soportes,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number, user: any): Promise<SoporteTecnico> {
    const soporte = await this.soporteRepository.findOne({
      where: { id },
      relations: ['usuario'],
      withDeleted: false,
    });

    if (!soporte) {
      throw new NotFoundException(
        `Ticket de soporte con ID ${id} no encontrado`,
      );
    }

    // Verificar que el usuario es el propietario del ticket o es admin
    const isAdmin = user.roles.some((rol) => rol.nombre === 'admin');
    if (!isAdmin && soporte.usuario_id !== user.id) {
      throw new ForbiddenException(
        'No tienes permiso para acceder a este ticket de soporte',
      );
    }

    return soporte;
  }

  async update(
    id: number,
    updateSoporteDto: UpdateSoporteTecnicoDto,
    user: any,
  ): Promise<SoporteTecnico> {
    const soporte = await this.findOne(id, user);

    // Solo admin puede actualizar el estado y la respuesta
    const isAdmin = user.roles.some((rol) => rol.nombre === 'admin');
    if (!isAdmin && (updateSoporteDto.estado || updateSoporteDto.respuesta)) {
      throw new ForbiddenException(
        'No tienes permiso para actualizar el estado o la respuesta',
      );
    }

    // El usuario normal solo puede actualizar el asunto, mensaje y adjunto
    if (!isAdmin) {
      const { asunto, mensaje, adjunto_url } = updateSoporteDto;
      Object.assign(soporte, { asunto, mensaje, adjunto_url });
    } else {
      Object.assign(soporte, updateSoporteDto);
    }

    return this.soporteRepository.save(soporte);
  }

  async remove(id: number, user: any): Promise<void> {
    const soporte = await this.findOne(id, user);

    // Solo admin puede eliminar tickets
    const isAdmin = user.roles.some((rol) => rol.nombre === 'admin');
    if (!isAdmin) {
      throw new ForbiddenException(
        'No tienes permiso para eliminar tickets de soporte',
      );
    }

    await this.soporteRepository.softRemove(soporte);
  }
}
