import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAlertaInteligenteDto } from './dto/create-alerta-inteligente.dto';
import { UpdateAlertaInteligenteDto } from './dto/update-alerta-inteligente.dto';
import { AlertaInteligente } from './entities/alerta-inteligente.entity';
import { ProyectosService } from '../proyectos/proyectos.service';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class AlertasInteligentesService {
  constructor(
    @InjectRepository(AlertaInteligente)
    private readonly alertaRepository: Repository<AlertaInteligente>,
    private readonly proyectosService: ProyectosService,
  ) {}

  async create(
    createAlertaDto: CreateAlertaInteligenteDto,
    user: any,
  ): Promise<AlertaInteligente> {
    // Verificar que el proyecto existe y el usuario tiene acceso
    await this.proyectosService.findOne(createAlertaDto.proyecto_id, user);

    const alerta = this.alertaRepository.create(createAlertaDto);
    return this.alertaRepository.save(alerta);
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

    const [alertas, total] = await this.alertaRepository.findAndCount({
      where: { proyecto_id: proyectoId },
      skip,
      take: limit,
      withDeleted: false,
    });

    return {
      data: alertas,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number, user: any): Promise<AlertaInteligente> {
    const alerta = await this.alertaRepository.findOne({
      where: { id },
      relations: ['proyecto'],
      withDeleted: false,
    });

    if (!alerta) {
      throw new NotFoundException(`Alerta con ID ${id} no encontrada`);
    }

    // Verificar que el usuario tiene acceso al proyecto
    await this.proyectosService.findOne(alerta.proyecto_id, user);

    return alerta;
  }

  async update(
    id: number,
    updateAlertaDto: UpdateAlertaInteligenteDto,
    user: any,
  ): Promise<AlertaInteligente> {
    const alerta = await this.findOne(id, user);

    // Si se actualiza el proyecto, verificar que existe y el usuario tiene acceso
    if (updateAlertaDto.proyecto_id) {
      await this.proyectosService.findOne(updateAlertaDto.proyecto_id, user);
    }

    Object.assign(alerta, updateAlertaDto);
    return this.alertaRepository.save(alerta);
  }

  async remove(id: number, user: any): Promise<void> {
    const alerta = await this.findOne(id, user);
    await this.alertaRepository.softRemove(alerta);
  }
}
