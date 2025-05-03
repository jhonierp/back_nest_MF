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
import { ProyectosService } from './proyectos.service';
import { CreateProyectoDto } from './dto/create-proyecto.dto';
import { UpdateProyectoDto } from './dto/update-proyecto.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { PaginationDto } from '../common/dto/pagination.dto';

@ApiTags('Proyectos')
@Controller('proyectos')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ProyectosController {
  constructor(private readonly proyectosService: ProyectosService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo proyecto' })
  @ApiResponse({ status: 201, description: 'Proyecto creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  create(@Body() createProyectoDto: CreateProyectoDto, @Req() req: any) {
    return this.proyectosService.create(createProyectoDto, req.user.id);
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Obtener todos los proyectos (solo admin)' })
  @ApiResponse({ status: 200, description: 'Lista de proyectos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Prohibido - No tiene permisos' })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.proyectosService.findAll(paginationDto);
  }

  @Get('usuario')
  @ApiOperation({ summary: 'Obtener proyectos del usuario autenticado' })
  @ApiResponse({ status: 200, description: 'Lista de proyectos del usuario' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  findByUsuario(@Query() paginationDto: PaginationDto, @Req() req) {
    return this.proyectosService.findByUsuario(req.user.id, paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un proyecto por ID' })
  @ApiResponse({ status: 200, description: 'Proyecto encontrado' })
  @ApiResponse({ status: 404, description: 'Proyecto no encontrado' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  findOne(@Param('id') id: string, @Req() req) {
    return this.proyectosService.findOne(+id, req.user);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un proyecto' })
  @ApiResponse({
    status: 200,
    description: 'Proyecto actualizado exitosamente',
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 404, description: 'Proyecto no encontrado' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  update(
    @Param('id') id: string,
    @Body() updateProyectoDto: UpdateProyectoDto,
    @Req() req,
  ) {
    return this.proyectosService.update(+id, updateProyectoDto, req.user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un proyecto' })
  @ApiResponse({ status: 200, description: 'Proyecto eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Proyecto no encontrado' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  remove(@Param('id') id: string, @Req() req) {
    return this.proyectosService.remove(+id, req.user);
  }
}
