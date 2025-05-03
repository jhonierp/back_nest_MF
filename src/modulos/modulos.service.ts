import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import type { CreateModuloDto } from './dto/create-modulo.dto';
import type { UpdateModuloDto } from './dto/update-modulo.dto';
import { Modulo } from './entities/modulo.entity';
import type { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class ModulosService {
  constructor(
    @InjectRepository(Modulo)
    private readonly moduloRepository: Repository<Modulo>,
  ) {}

  async create(createModuloDto: CreateModuloDto): Promise<Modulo> {
    const modulo = this.moduloRepository.create(createModuloDto);

    return this.moduloRepository.save(modulo);
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    const skip = (page - 1) * limit;

    const [modulos, total] = await this.moduloRepository.findAndCount({
      skip,
      take: limit,
      relations: ['submodulos'],
      withDeleted: false,
    });

    return {
      data: modulos,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number): Promise<Modulo> {
    const modulo = await this.moduloRepository.findOne({
      where: { id },
      relations: ['submodulos'],
      withDeleted: false,
    });

    if (!modulo) {
      throw new NotFoundException(`Módulo con ID ${id} no encontrado`);
    }

    return modulo;
  }

  async update(id: number, updateModuloDto: UpdateModuloDto): Promise<Modulo> {
    const modulo = await this.findOne(id);

    Object.assign(modulo, updateModuloDto);
    return this.moduloRepository.save(modulo);
  }

  async remove(id: number): Promise<void> {
    const modulo = await this.findOne(id);
    await this.moduloRepository.softRemove(modulo);
  }
}
