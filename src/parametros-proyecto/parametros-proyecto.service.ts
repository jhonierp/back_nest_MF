import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateParametroProyectoDto } from './dto/create-parametro-proyecto.dto';
import { UpdateParametroProyectoDto } from './dto/update-parametro-proyecto.dto';
import { ParametroProyecto } from './entities/parametro-proyecto.entity';
import { ProyectosService } from '../proyectos/proyectos.service';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class ParametrosProyectoService {
  constructor(
    @InjectRepository(ParametroProyecto)
    private readonly parametroProyectoRepository: Repository<ParametroProyecto>,
    private readonly proyectosService: ProyectosService,
  ) {}

  async create(
    createParametroProyectoDto: CreateParametroProyectoDto,
    metroProyectoDto,
    user: any,
  ): Promise<ParametroProyecto> {
    // Verificar que el proyecto existe y el usuario tiene acceso
    await this.proyectosService.findOne(
      createParametroProyectoDto.proyecto_id,
      user,
    );

    const parametro = this.parametroProyectoRepository.create(
      createParametroProyectoDto,
    );
    return this.parametroProyectoRepository.save(parametro);
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

    const [parametros, total] =
      await this.parametroProyectoRepository.findAndCount({
        where: { proyecto_id: proyectoId },
        skip,
        take: limit,
        withDeleted: false,
      });

    return {
      data: parametros,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number, user: any): Promise<ParametroProyecto> {
    const parametro = await this.parametroProyectoRepository.findOne({
      where: { id },
      relations: ['proyecto'],
      withDeleted: false,
    });

    if (!parametro) {
      throw new NotFoundException(`Parámetro con ID ${id} no encontrado`);
    }

    // Verificar que el usuario tiene acceso al proyecto
    await this.proyectosService.findOne(parametro.proyecto_id, user);

    return parametro;
  }

  async update(
    id: number,
    updateParametroProyectoDto: UpdateParametroProyectoDto,
    user: any,
  ): Promise<ParametroProyecto> {
    const parametro = await this.findOne(id, user);

    // Si se actualiza el proyecto, verificar que existe y el usuario tiene acceso
    if (updateParametroProyectoDto.proyecto_id) {
      await this.proyectosService.findOne(
        updateParametroProyectoDto.proyecto_id,
        user,
      );
    }

    Object.assign(parametro, updateParametroProyectoDto);
    return this.parametroProyectoRepository.save(parametro);
  }

  async remove(id: number, user: any): Promise<void> {
    const parametro = await this.findOne(id, user);
    await this.parametroProyectoRepository.softRemove(parametro);
  }
}
