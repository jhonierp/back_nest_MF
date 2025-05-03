import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { RolesService } from '../roles/roles.service';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    private readonly rolesService: RolesService,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const { password, ...userData } = createUsuarioDto;

    // Verificar si el usuario ya existe
    const existingUser = await this.findByEmail(userData.email);
    if (existingUser) {
      throw new BadRequestException('El correo electrónico ya está registrado');
    }

    // Encriptar contraseña si existe
    const usuario = this.usuarioRepository.create({
      ...userData,
      password: password ? await bcrypt.hash(password, 10) : null,
    });

    return this.usuarioRepository.save(usuario);
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    const skip = (page - 1) * limit;

    const [usuarios, total] = await this.usuarioRepository.findAndCount({
      skip,
      take: limit,
      relations: ['roles'],
      withDeleted: false,
    });

    return {
      data: usuarios,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({
      where: { id },
      relations: ['roles'],
      withDeleted: false,
    });

    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    return usuario;
  }

  async findByEmail(email: string): Promise<Usuario> {
    return this.usuarioRepository.findOne({
      where: { email },
      relations: ['roles'],
      withDeleted: false,
    });
  }

  async findByTelefono(telefono: string): Promise<Usuario> {
    return this.usuarioRepository.findOne({
      where: { telefono },
      relations: ['roles'],
      withDeleted: false,
    });
  }

  async update(
    id: number,
    updateUsuarioDto: UpdateUsuarioDto,
  ): Promise<Usuario> {
    const usuario = await this.findOne(id);

    // Si se actualiza la contraseña, encriptarla
    if (updateUsuarioDto.password) {
      updateUsuarioDto.password = await bcrypt.hash(
        updateUsuarioDto.password,
        10,
      );
    }

    Object.assign(usuario, updateUsuarioDto);
    return this.usuarioRepository.save(usuario);
  }

  async remove(id: number): Promise<void> {
    const usuario = await this.findOne(id);
    await this.usuarioRepository.softRemove(usuario);
  }

  async asignarRol(usuarioId: number, rolId: number): Promise<Usuario> {
    const usuario = await this.findOne(usuarioId);
    const rol = await this.rolesService.findOne(rolId);

    // Verificar si ya tiene el rol
    const tieneRol = usuario.roles.some((r) => r.id === rol.id);
    if (!tieneRol) {
      usuario.roles.push(rol);
      await this.usuarioRepository.save(usuario);
    }

    return usuario;
  }

  async quitarRol(usuarioId: number, rolId: number): Promise<Usuario> {
    const usuario = await this.findOne(usuarioId);

    usuario.roles = usuario.roles.filter((rol) => rol.id !== rolId);
    return this.usuarioRepository.save(usuario);
  }
}
