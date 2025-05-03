import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTipoEventoDto } from './dto/create-tipo-evento.dto';
import { UpdateTipoEventoDto } from './dto/update-tipo-evento.dto';
import { TipoEvento } from './entities/tipo-evento.entity';

@Injectable()
export class TiposEventoService {
  constructor(
    @InjectRepository(TipoEvento)
    private readonly tipoEventoRepository: Repository<TipoEvento>,
  ) {}

  async create(createTipoEventoDto: CreateTipoEventoDto): Promise<TipoEvento> {
    const tipoEvento = this.tipoEventoRepository.create(createTipoEventoDto);
    return this.tipoEventoRepository.save(tipoEvento);
  }

  async findAll(): Promise<TipoEvento[]> {
    return this.tipoEventoRepository.find({ withDeleted: false });
  }

  async findOne(id: number): Promise<TipoEvento> {
    const tipoEvento = await this.tipoEventoRepository.findOne({
      where: { id },
      withDeleted: false,
    });

    if (!tipoEvento) {
      throw new NotFoundException(`Tipo de evento con ID ${id} no encontrado`);
    }

    return tipoEvento;
  }

  async update(
    id: number,
    updateTipoEventoDto: UpdateTipoEventoDto,
  ): Promise<TipoEvento> {
    const tipoEvento = await this.findOne(id);

    Object.assign(tipoEvento, updateTipoEventoDto);
    return this.tipoEventoRepository.save(tipoEvento);
  }

  async remove(id: number): Promise<void> {
    const tipoEvento = await this.findOne(id);
    await this.tipoEventoRepository.softRemove(tipoEvento);
  }
}
