import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProyectoDto } from './dto/create-proyecto.dto';
import { UpdateProyectoDto } from './dto/update-proyecto.dto';
import { Proyecto } from './entities/proyecto.entity';
import { UsuariosService } from '../usuarios/usuarios.service';
import { ModulosService } from '../modulos/modulos.service';
import { SubmodulosService } from '../submodulos/submodulos.service';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class ProyectosService {
  constructor(
    @InjectRepository(Proyecto)
    private readonly proyectoRepository: Repository<Proyecto>,
    private readonly usuariosService: UsuariosService,
    private readonly modulosService: ModulosService,
    private readonly submodulosService: SubmodulosService,
    losService: SubmodulosService,
  ) {}

  async create(
    createProyectoDto: CreateProyectoDto,
    usuarioId: number,
  ): Promise<Proyecto> {
    // Verificar que el usuario existe
    await this.usuariosService.findOne(usuarioId);

    // Verificar que el módulo existe
    await this.modulosService.findOne(createProyectoDto.modulo_id);

    // Verificar que el submódulo existe
    await this.submodulosService.findOne(createProyectoDto.submodulo_id);

    const proyecto = this.proyectoRepository.create({
      ...createProyectoDto,
      usuario_id: usuarioId,
    });

    return this.proyectoRepository.save(proyecto);
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    const skip = (page - 1) * limit;

    const [proyectos, total] = await this.proyectoRepository.findAndCount({
      skip,
      take: limit,
      relations: ['usuario', 'modulo', 'submodulo'],
      withDeleted: false,
    });

    return {
      data: proyectos,
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

    const [proyectos, total] = await this.proyectoRepository.findAndCount({
      where: { usuario_id: usuarioId },
      skip,
      take: limit,
      relations: ['modulo', 'submodulo'],
      withDeleted: false,
    });

    return {
      data: proyectos,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number, user: any): Promise<Proyecto> {
    const proyecto = await this.proyectoRepository.findOne({
      where: { id },
      relations: ['usuario', 'modulo', 'submodulo'],
      withDeleted: false,
    });

    if (!proyecto) {
      throw new NotFoundException(`Proyecto con ID ${id} no encontrado`);
    }

    // Verificar si el usuario es admin o dueño del proyecto
    const isAdmin = user.roles.some((rol) => rol.nombre === 'admin');
    if (!isAdmin && proyecto.usuario_id !== user.id) {
      throw new ForbiddenException(
        'No tienes permiso para acceder a este proyecto',
      );
    }

    return proyecto;
  }

  async update(
    id: number,
    updateProyectoDto: UpdateProyectoDto,
    user: any,
  ): Promise<Proyecto> {
    const proyecto = await this.findOne(id, user);

    // Si se actualiza el módulo, verificar que existe
    if (updateProyectoDto.modulo_id) {
      await this.modulosService.findOne(updateProyectoDto.modulo_id);
    }

    // Si se actualiza el submódulo, verificar que existe
    if (updateProyectoDto.submodulo_id) {
      await this.submodulosService.findOne(updateProyectoDto.submodulo_id);
    }

    Object.assign(proyecto, updateProyectoDto);
    return this.proyectoRepository.save(proyecto);
  }

  async remove(id: number, user: any): Promise<void> {
    const proyecto = await this.findOne(id, user);
    await this.proyectoRepository.softRemove(proyecto);
  }
}
