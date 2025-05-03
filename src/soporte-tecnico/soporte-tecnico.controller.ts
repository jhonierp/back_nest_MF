import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Req,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { SoporteTecnicoService } from './soporte-tecnico.service';
import { CreateSoporteTecnicoDto } from './dto/create-soporte-tecnico.dto';
import { UpdateSoporteTecnicoDto } from './dto/update-soporte-tecnico.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { PaginationDto } from '../common/dto/pagination.dto';

@ApiTags('Soporte Técnico')
@Controller('soporte-tecnico')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class SoporteTecnicoController {
  constructor(private readonly soporteTecnicoService: SoporteTecnicoService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo ticket de soporte' })
  @ApiResponse({ status: 201, description: 'Ticket creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  create(
    @Body() createSoporteTecnicoDto: CreateSoporteTecnicoDto,
    @Req() req,
  ): Promise<any> {
    return this.soporteTecnicoService.create(createSoporteTecnicoDto, req.user);
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOperation({
    summary: 'Obtener todos los tickets de soporte (solo admin)',
  })
  @ApiResponse({ status: 200, description: 'Lista de tickets' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Prohibido - No tiene permisos' })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.soporteTecnicoService.findAll(paginationDto);
  }

  @Get('usuario')
  @ApiOperation({ summary: 'Obtener tickets del usuario autenticado' })
  @ApiResponse({ status: 200, description: 'Lista de tickets del usuario' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  findByUsuario(@Query() paginationDto: PaginationDto, @Req() req) {
    return this.soporteTecnicoService.findByUsuario(req.user.id, paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un ticket por ID' })
  @ApiResponse({ status: 200, description: 'Ticket encontrado' })
  @ApiResponse({ status: 404, description: 'Ticket no encontrado' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Prohibido - No tiene permisos' })
  findOne(@Param('id') id: string, @Req() req) {
    return this.soporteTecnicoService.findOne(+id, req.user);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un ticket' })
  @ApiResponse({ status: 200, description: 'Ticket actualizado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 404, description: 'Ticket no encontrado' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Prohibido - No tiene permisos' })
  update(
    @Param('id') id: string,
    @Body() updateSoporteTecnicoDto: UpdateSoporteTecnicoDto,
    @Req() req,
  ) {
    return this.soporteTecnicoService.update(
      +id,
      updateSoporteTecnicoDto,
      req.user,
    );
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Eliminar un ticket' })
  @ApiResponse({ status: 200, description: 'Ticket eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Ticket no encontrado' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Prohibido - No tiene permisos' })
  remove(@Param('id') id: string, @Req() req) {
    return this.soporteTecnicoService.remove(+id, req.user);
  }
}
