import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, In, type Repository } from 'typeorm';
import { CreateAgendaDto } from './dto/create-agenda.dto';
import { UpdateAgendaDto } from './dto/update-agenda.dto';
import { Agenda } from './entities/agenda.entity';
import { ProyectosService } from '../proyectos/proyectos.service';
import { TareasService } from '../tareas/tareas.service';
import { EventosService } from '../eventos/eventos.service';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class AgendasService {
  constructor(
    @InjectRepository(Agenda)
    private readonly agendaRepository: Repository<Agenda>,
    private readonly proyectosService: ProyectosService,
    private readonly tareasService: TareasService,
    private readonly eventosService: EventosService,
  ) {}

  async create(createAgendaDto: CreateAgendaDto, user: any): Promise<Agenda> {
    // Verificar que el proyecto existe y el usuario tiene acceso
    await this.proyectosService.findOne(createAgendaDto.proyecto_id, user);

    // Validar según el tipo
    if (createAgendaDto.tipo === 'tarea') {
      if (!createAgendaDto.tarea_id) {
        throw new BadRequestException(
          "Para tipo 'tarea' debe proporcionar tarea_id",
        );
      }
      // Verificar que la tarea existe y el usuario tiene acceso
      await this.tareasService.findOne(createAgendaDto.tarea_id, user);
    } else if (createAgendaDto.tipo === 'evento') {
      if (!createAgendaDto.evento_id) {
        throw new BadRequestException(
          "Para tipo 'evento' debe proporcionar evento_id",
        );
      }
      // Verificar que el evento existe y el usuario tiene acceso
      await this.eventosService.findOne(createAgendaDto.evento_id, user);
    }

    const agenda = this.agendaRepository.create(createAgendaDto);
    return this.agendaRepository.save(agenda);
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

    const [agendas, total] = await this.agendaRepository.findAndCount({
      where: { proyecto_id: proyectoId },
      skip,
      take: limit,
      relations: ['tarea', 'evento'],
      order: { fecha: 'ASC' },
      withDeleted: false,
    });

    return {
      data: agendas,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findByFechas(fechaInicio: string, fechaFin: string, user: any) {
    // Obtener todos los proyectos del usuario
    const proyectosResponse = await this.proyectosService.findByUsuario(
      user.id,
      { page: 1, limit: 1000 },
    );
    const proyectoIds = proyectosResponse.data.map((proyecto) => proyecto.id);

    // Si el usuario es admin, puede ver todas las agendas
    const isAdmin = user.roles.some((rol) => rol.nombre === 'admin');

    const agendas = await this.agendaRepository.find({
      where: isAdmin
        ? {
            fecha: Between(new Date(fechaInicio), new Date(fechaFin)),
          }
        : {
            fecha: Between(new Date(fechaInicio), new Date(fechaFin)),
            proyecto_id: proyectoIds.length > 0 ? In(proyectoIds) : In([-1]),
          },
      relations: ['proyecto', 'tarea', 'evento'],
      order: { fecha: 'ASC' },
      withDeleted: false,
    });

    return agendas;
  }

  async findOne(id: number, user: any): Promise<Agenda> {
    const agenda = await this.agendaRepository.findOne({
      where: { id },
      relations: ['proyecto', 'tarea', 'evento'],
      withDeleted: false,
    });

    if (!agenda) {
      throw new NotFoundException(`Agenda con ID ${id} no encontrada`);
    }

    // Verificar que el usuario tiene acceso al proyecto
    await this.proyectosService.findOne(agenda.proyecto_id, user);

    return agenda;
  }

  async update(
    id: number,
    updateAgendaDto: UpdateAgendaDto,
    user: any,
  ): Promise<Agenda> {
    const agenda = await this.findOne(id, user);

    // Si se actualiza el proyecto, verificar que existe y el usuario tiene acceso
    if (updateAgendaDto.proyecto_id) {
      await this.proyectosService.findOne(updateAgendaDto.proyecto_id, user);
    }

    // Validar según el tipo
    if (updateAgendaDto.tipo) {
      if (updateAgendaDto.tipo === 'tarea') {
        if (!updateAgendaDto.tarea_id && !agenda.tarea_id) {
          throw new BadRequestException(
            "Para tipo 'tarea' debe proporcionar tarea_id",
          );
        }
        if (updateAgendaDto.tarea_id) {
          // Verificar que la tarea existe y el usuario tiene acceso
          await this.tareasService.findOne(updateAgendaDto.tarea_id, user);
        }
      } else if (updateAgendaDto.tipo === 'evento') {
        if (!updateAgendaDto.evento_id && !agenda.evento_id) {
          throw new BadRequestException(
            "Para tipo 'evento' debe proporcionar evento_id",
          );
        }
        if (updateAgendaDto.evento_id) {
          // Verificar que el evento existe y el usuario tiene acceso
          await this.eventosService.findOne(updateAgendaDto.evento_id, user);
        }
      }
    }

    Object.assign(agenda, updateAgendaDto);
    return this.agendaRepository.save(agenda);
  }

  async remove(id: number, user: any): Promise<void> {
    const agenda = await this.findOne(id, user);
    await this.agendaRepository.softRemove(agenda);
  }
}
