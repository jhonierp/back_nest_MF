import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFormatoReporteDto } from './dto/create-formato-reporte.dto';
import { UpdateFormatoReporteDto } from './dto/update-formato-reporte.dto';
import { FormatoReporte } from './entities/formato-reporte.entity';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class FormatosReporteService {
  constructor(
    @InjectRepository(FormatoReporte)
    private readonly formatoRepository: Repository<FormatoReporte>,
  ) {}

  async create(
    createFormatoDto: CreateFormatoReporteDto,
  ): Promise<FormatoReporte> {
    const formato = this.formatoRepository.create(createFormatoDto);
    return this.formatoRepository.save(formato);
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    const skip = (page - 1) * limit;

    const [formatos, total] = await this.formatoRepository.findAndCount({
      skip,
      take: limit,
      withDeleted: false,
    });

    return {
      data: formatos,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number): Promise<FormatoReporte> {
    const formato = await this.formatoRepository.findOne({
      where: { id },
      withDeleted: false,
    });

    if (!formato) {
      throw new NotFoundException(
        `Formato de reporte con ID ${id} no encontrado`,
      );
    }

    return formato;
  }

  async update(
    id: number,
    updateFormatoDto: UpdateFormatoReporteDto,
  ): Promise<FormatoReporte> {
    const formato = await this.findOne(id);

    Object.assign(formato, updateFormatoDto);
    return this.formatoRepository.save(formato);
  }

  async remove(id: number): Promise<void> {
    const formato = await this.findOne(id);
    await this.formatoRepository.softRemove(formato);
  }
}
