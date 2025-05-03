import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReporteDto } from './dto/create-reporte.dto';
import { UpdateReporteDto } from './dto/update-reporte.dto';
import { Reporte } from './entities/reporte.entity';
import { ProyectosService } from '../proyectos/proyectos.service';
import { FormatosReporteService } from '../formatos-reporte/formatos-reporte.service';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class ReportesService {
  constructor(
    @InjectRepository(Reporte)
    private readonly reporteRepository: Repository<Reporte>,
    private readonly proyectosService: ProyectosService,
    private readonly formatosService: FormatosReporteService,
  ) {}

  async create(
    createReporteDto: CreateReporteDto,
    user: any,
  ): Promise<Reporte> {
    // Verificar que el proyecto existe y el usuario tiene acceso
    await this.proyectosService.findOne(createReporteDto.proyecto_id, user);

    // Verificar que el formato existe
    await this.formatosService.findOne(createReporteDto.formato_id);

    const reporte = this.reporteRepository.create(createReporteDto);
    return this.reporteRepository.save(reporte);
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

    const [reportes, total] = await this.reporteRepository.findAndCount({
      where: { proyecto_id: proyectoId },
      skip,
      take: limit,
      relations: ['formato'],
      order: { fecha_inicio: 'DESC' },
      withDeleted: false,
    });

    return {
      data: reportes,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number, user: any): Promise<Reporte> {
    const reporte = await this.reporteRepository.findOne({
      where: { id },
      relations: ['proyecto', 'formato'],
      withDeleted: false,
    });

    if (!reporte) {
      throw new NotFoundException(`Reporte con ID ${id} no encontrado`);
    }

    // Verificar que el usuario tiene acceso al proyecto
    await this.proyectosService.findOne(reporte.proyecto_id, user);

    return reporte;
  }

  async update(
    id: number,
    updateReporteDto: UpdateReporteDto,
    user: any,
  ): Promise<Reporte> {
    const reporte = await this.findOne(id, user);

    // Si se actualiza el proyecto, verificar que existe y el usuario tiene acceso
    if (updateReporteDto.proyecto_id) {
      await this.proyectosService.findOne(updateReporteDto.proyecto_id, user);
    }

    // Si se actualiza el formato, verificar que existe
    if (updateReporteDto.formato_id) {
      await this.formatosService.findOne(updateReporteDto.formato_id);
    }

    Object.assign(reporte, updateReporteDto);
    return this.reporteRepository.save(reporte);
  }

  async remove(id: number, user: any): Promise<void> {
    const reporte = await this.findOne(id, user);
    await this.reporteRepository.softRemove(reporte);
  }
}
