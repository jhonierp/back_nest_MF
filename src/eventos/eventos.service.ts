import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventoDto } from './dto/create-evento.dto';
import { UpdateEventoDto } from './dto/update-evento.dto';
import { Evento } from './entities/evento.entity';
import { ProyectosService } from '../proyectos/proyectos.service';
import { TiposEventoService } from '../tipos-evento/tipos-evento.service';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class EventosService {
  constructor(
    @InjectRepository(Evento)
    private readonly eventoRepository: Repository<Evento>,
    private readonly proyectosService: ProyectosService,
    private readonly tiposEventoService: TiposEventoService,
  ) {}

  async create(createEventoDto: CreateEventoDto, user: any): Promise<Evento> {
    // Verificar que el proyecto existe y el usuario tiene acceso
    await this.proyectosService.findOne(createEventoDto.proyecto_id, user);

    // Verificar que el tipo de evento existe
    await this.tiposEventoService.findOne(createEventoDto.tipo_evento_id);

    const evento = this.eventoRepository.create(createEventoDto);
    return this.eventoRepository.save(evento);
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

    const [eventos, total] = await this.eventoRepository.findAndCount({
      where: { proyecto_id: proyectoId },
      skip,
      take: limit,
      relations: ['tipo_evento'],
      order: { fecha_evento: 'DESC' },
      withDeleted: false,
    });

    return {
      data: eventos,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number, user: any): Promise<Evento> {
    const evento = await this.eventoRepository.findOne({
      where: { id },
      relations: ['proyecto', 'tipo_evento'],
      withDeleted: false,
    });

    if (!evento) {
      throw new NotFoundException(`Evento con ID ${id} no encontrado`);
    }

    // Verificar que el usuario tiene acceso al proyecto
    await this.proyectosService.findOne(evento.proyecto_id, user);

    return evento;
  }

  async update(
    id: number,
    updateEventoDto: UpdateEventoDto,
    user: any,
  ): Promise<Evento> {
    const evento = await this.findOne(id, user);

    // Si se actualiza el proyecto, verificar que existe y el usuario tiene acceso
    if (updateEventoDto.proyecto_id) {
      await this.proyectosService.findOne(updateEventoDto.proyecto_id, user);
    }

    // Si se actualiza el tipo de evento, verificar que existe
    if (updateEventoDto.tipo_evento_id) {
      await this.tiposEventoService.findOne(updateEventoDto.tipo_evento_id);
    }

    Object.assign(evento, updateEventoDto);
    return this.eventoRepository.save(evento);
  }

  async remove(id: number, user: any): Promise<void> {
    const evento = await this.findOne(id, user);
    await this.eventoRepository.softRemove(evento);
  }
}
