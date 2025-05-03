import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSubmoduloDto } from './dto/create-submodulo.dto';
import { UpdateSubmoduloDto } from './dto/update-submodulo.dto';
import { Submodulo } from './entities/submodulo.entity';
import { ModulosService } from '../modulos/modulos.service';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class SubmodulosService {
  constructor(
    @InjectRepository(Submodulo)
    private readonly submoduloRepository: Repository<Submodulo>,
    private readonly modulosService: ModulosService,
  ) {}

  async create(createSubmoduloDto: CreateSubmoduloDto): Promise<Submodulo> {
    // Verificar que el módulo existe
    await this.modulosService.findOne(createSubmoduloDto.modulo_id);

    const submodulo = this.submoduloRepository.create(createSubmoduloDto);
    return this.submoduloRepository.save(submodulo);
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    const skip = (page - 1) * limit;

    const [submodulos, total] = await this.submoduloRepository.findAndCount({
      skip,
      take: limit,
      relations: ['modulo'],
      withDeleted: false,
    });

    return {
      data: submodulos,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findByModulo(moduloId: number, paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    const skip = (page - 1) * limit;

    // Verificar que el módulo existe
    await this.modulosService.findOne(moduloId);

    const [submodulos, total] = await this.submoduloRepository.findAndCount({
      where: { modulo_id: moduloId },
      skip,
      take: limit,
      relations: ['modulo'],
      withDeleted: false,
    });

    return {
      data: submodulos,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number): Promise<Submodulo> {
    const submodulo = await this.submoduloRepository.findOne({
      where: { id },
      relations: ['modulo'],
      withDeleted: false,
    });

    if (!submodulo) {
      throw new NotFoundException(`Submódulo con ID ${id} no encontrado`);
    }

    return submodulo;
  }

  async update(
    id: number,
    updateSubmoduloDto: UpdateSubmoduloDto,
  ): Promise<Submodulo> {
    const submodulo = await this.findOne(id);

    // Si se actualiza el módulo, verificar que existe
    if (updateSubmoduloDto.modulo_id) {
      await this.modulosService.findOne(updateSubmoduloDto.modulo_id);
    }

    Object.assign(submodulo, updateSubmoduloDto);
    return this.submoduloRepository.save(submodulo);
  }

  async remove(id: number): Promise<void> {
    const submodulo = await this.findOne(id);
    await this.submoduloRepository.softRemove(submodulo);
  }
}
