import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoriaTransaccionDto } from './dto/create-categoria-transaccion.dto';
import { UpdateCategoriaTransaccionDto } from './dto/update-categoria-transaccion.dto';
import { CategoriaTransaccion } from './entities/categoria-transaccion.entity';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class CategoriasTransaccionService {
  constructor(
    @InjectRepository(CategoriaTransaccion)
    private readonly categoriaRepository: Repository<CategoriaTransaccion>,
  ) {}

  async create(
    createCategoriaDto: CreateCategoriaTransaccionDto,
  ): Promise<CategoriaTransaccion> {
    const categoria = this.categoriaRepository.create(createCategoriaDto);
    return this.categoriaRepository.save(categoria);
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    const skip = (page - 1) * limit;

    const [categorias, total] = await this.categoriaRepository.findAndCount({
      skip,
      take: limit,
      withDeleted: false,
    });

    return {
      data: categorias,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findByTipo(tipo: string, paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    const skip = (page - 1) * limit;

    const [categorias, total] = await this.categoriaRepository.findAndCount({
      where: { tipo },
      skip,
      take: limit,
      withDeleted: false,
    });

    return {
      data: categorias,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number): Promise<CategoriaTransaccion> {
    const categoria = await this.categoriaRepository.findOne({
      where: { id },
      withDeleted: false,
    });

    if (!categoria) {
      throw new NotFoundException(`Categoría con ID ${id} no encontrada`);
    }

    return categoria;
  }

  async update(
    id: number,
    updateCategoriaDto: UpdateCategoriaTransaccionDto,
  ): Promise<CategoriaTransaccion> {
    const categoria = await this.findOne(id);

    Object.assign(categoria, updateCategoriaDto);
    return this.categoriaRepository.save(categoria);
  }

  async remove(id: number): Promise<void> {
    const categoria = await this.findOne(id);
    await this.categoriaRepository.softRemove(categoria);
  }
}
