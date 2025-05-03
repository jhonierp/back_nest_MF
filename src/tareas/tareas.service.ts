import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { In } from 'typeorm';
import { CreateTareaDto } from './dto/create-tarea.dto';
import { UpdateTareaDto } from './dto/update-tarea.dto';
import { Tarea } from './entities/tarea.entity';
import { ProyectosService } from '../proyectos/proyectos.service';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class TareasService {
  constructor(
    @InjectRepository(Tarea)
    private readonly tareaRepository: Repository<Tarea>,
    private readonly proyectosService: ProyectosService,
  ) {}

  async create(createTareaDto: CreateTareaDto, user: any): Promise<Tarea> {
    // Verificar que el proyecto existe y el usuario tiene acceso
    await this.proyectosService.findOne(createTareaDto.proyecto_id, user);

    const tarea = this.tareaRepository.create(createTareaDto);
    return this.tareaRepository.save(tarea);
  }

  async findByProyecto(
    proyectoId: number,
    paginationDto: PaginationDto,
    user: any,
  ) {
    // Verificar que el proyecto existe y el usuario tiene acceso
    await this.proyectosService.findOne(proyectoId, user);

    const { page, limit } = paginationDto;
    const skip = (page - 1) * limit;

    const [tareas, total] = await this.tareaRepository.findAndCount({
      where: { proyecto_id: proyectoId },
      skip,
      take: limit,
      order: { fecha: 'ASC' },
      withDeleted: false,
    });

    return {
      data: tareas,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findByFecha(fecha: string, user: any) {
    // Obtener todos los proyectos del usuario
    const proyectosResponse = await this.proyectosService.findByUsuario(
      user.id,
      { page: 1, limit: 1000 },
    );
    const proyectoIds = proyectosResponse.data.map((proyecto) => proyecto.id);

    // Si el usuario es admin, puede ver todas las tareas
    const isAdmin = user.roles.some((rol) => rol.nombre === 'admin');

    const tareas = await this.tareaRepository.find({
      where: isAdmin
        ? { fecha: new Date(fecha) }
        : {
            fecha: new Date(fecha),
            proyecto_id: proyectoIds.length > 0 ? In(proyectoIds) : In([-1]),
          },
      relations: ['proyecto'],
      withDeleted: false,
    });

    return tareas;
  }

  async findOne(id: number, user: any): Promise<Tarea> {
    const tarea = await this.tareaRepository.findOne({
      where: { id },
      relations: ['proyecto'],
      withDeleted: false,
    });

    if (!tarea) {
      throw new NotFoundException(`Tarea con ID ${id} no encontrada`);
    }

    // Verificar que el usuario tiene acceso al proyecto
    await this.proyectosService.findOne(tarea.proyecto_id, user);

    return tarea;
  }

  async update(
    id: number,
    updateTareaDto: UpdateTareaDto,
    user: any,
  ): Promise<Tarea> {
    const tarea = await this.findOne(id, user);

    // Si se actualiza el proyecto, verificar que existe y el usuario tiene acceso
    if (updateTareaDto.proyecto_id) {
      await this.proyectosService.findOne(updateTareaDto.proyecto_id, user);
    }

    Object.assign(tarea, updateTareaDto);
    return this.tareaRepository.save(tarea);
  }

  async remove(id: number, user: any): Promise<void> {
    const tarea = await this.findOne(id, user);
    await this.tareaRepository.softRemove(tarea);
  }
}
