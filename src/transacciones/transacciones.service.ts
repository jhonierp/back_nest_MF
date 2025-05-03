import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, type Repository } from 'typeorm';
import { CreateTransaccionDto } from './dto/create-transaccion.dto';
import { UpdateTransaccionDto } from './dto/update-transaccion.dto';
import { Transaccion } from './entities/transaccion.entity';
import { ProyectosService } from '../proyectos/proyectos.service';
import { CategoriasTransaccionService } from '../categorias-transaccion/categorias-transaccion.service';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class TransaccionesService {
  constructor(
    @InjectRepository(Transaccion)
    private readonly transaccionRepository: Repository<Transaccion>,
    private readonly proyectosService: ProyectosService,
    private readonly categoriasService: CategoriasTransaccionService,
  ) {}

  async create(
    createTransaccionDto: CreateTransaccionDto,
    user: any,
  ): Promise<Transaccion> {
    // Verificar que el proyecto existe y el usuario tiene acceso
    await this.proyectosService.findOne(createTransaccionDto.proyecto_id, user);

    // Verificar que la categoría existe
    await this.categoriasService.findOne(createTransaccionDto.categoria_id);

    const transaccion = this.transaccionRepository.create(createTransaccionDto);
    return this.transaccionRepository.save(transaccion);
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

    const [transacciones, total] =
      await this.transaccionRepository.findAndCount({
        where: { proyecto_id: proyectoId },
        skip,
        take: limit,
        relations: ['categoria'],
        order: { fecha: 'DESC' },
        withDeleted: false,
      });

    return {
      data: transacciones,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findByProyectoAndFechas(
    proyectoId: number,
    fechaInicio: string,
    fechaFin: string,
    user: any,
  ) {
    // Verificar que el proyecto existe y el usuario tiene acceso
    await this.proyectosService.findOne(proyectoId, user);

    const transacciones = await this.transaccionRepository.find({
      where: {
        proyecto_id: proyectoId,
        fecha: Between(new Date(fechaInicio), new Date(fechaFin)),
      },
      relations: ['categoria'],
      order: { fecha: 'DESC' },
      withDeleted: false,
    });

    return transacciones;
  }

  async findOne(id: number, user: any): Promise<Transaccion> {
    const transaccion = await this.transaccionRepository.findOne({
      where: { id },
      relations: ['proyecto', 'categoria'],
      withDeleted: false,
    });

    if (!transaccion) {
      throw new NotFoundException(`Transacción con ID ${id} no encontrada`);
    }

    // Verificar que el usuario tiene acceso al proyecto
    await this.proyectosService.findOne(transaccion.proyecto_id, user);

    return transaccion;
  }

  async update(
    id: number,
    updateTransaccionDto: UpdateTransaccionDto,
    user: any,
  ): Promise<Transaccion> {
    const transaccion = await this.findOne(id, user);

    // Si se actualiza el proyecto, verificar que existe y el usuario tiene acceso
    if (updateTransaccionDto.proyecto_id) {
      await this.proyectosService.findOne(
        updateTransaccionDto.proyecto_id,
        user,
      );
    }

    // Si se actualiza la categoría, verificar que existe
    if (updateTransaccionDto.categoria_id) {
      await this.categoriasService.findOne(updateTransaccionDto.categoria_id);
    }

    Object.assign(transaccion, updateTransaccionDto);
    return this.transaccionRepository.save(transaccion);
  }

  async remove(id: number, user: any): Promise<void> {
    const transaccion = await this.findOne(id, user);
    await this.transaccionRepository.softRemove(transaccion);
  }
}
