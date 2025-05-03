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
import { TareasService } from './tareas.service';
import { CreateTareaDto } from './dto/create-tarea.dto';
import { UpdateTareaDto } from './dto/update-tarea.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { PaginationDto } from '../common/dto/pagination.dto';

@ApiTags('Tareas')
@Controller('tareas')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class TareasController {
  constructor(private readonly tareasService: TareasService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva tarea' })
  @ApiResponse({ status: 201, description: 'Tarea creada exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  create(@Body() createTareaDto: CreateTareaDto, @Req() req: any) {
    return this.tareasService.create(createTareaDto, req.user);
  }

  @Get('proyecto/:proyectoId')
  @ApiOperation({ summary: 'Obtener tareas por proyecto' })
  @ApiResponse({ status: 200, description: 'Lista de tareas del proyecto' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'Proyecto no encontrado' })
  findByProyecto(
    @Param('proyectoId') proyectoId: string,
    @Query() paginationDto: PaginationDto,
    @Req() req,
  ) {
    return this.tareasService.findByProyecto(
      +proyectoId,
      paginationDto,
      req.user,
    );
  }

  @Get('fecha/:fecha')
  @ApiOperation({ summary: 'Obtener tareas por fecha' })
  @ApiResponse({ status: 200, description: 'Lista de tareas por fecha' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  findByFecha(@Param('fecha') fecha: string, @Req() req) {
    return this.tareasService.findByFecha(fecha, req.user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una tarea por ID' })
  @ApiResponse({ status: 200, description: 'Tarea encontrada' })
  @ApiResponse({ status: 404, description: 'Tarea no encontrada' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  findOne(@Param('id') id: string, @Req() req) {
    return this.tareasService.findOne(+id, req.user);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una tarea' })
  @ApiResponse({ status: 200, description: 'Tarea actualizada exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 404, description: 'Tarea no encontrada' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  update(
    @Param('id') id: string,
    @Body() updateTareaDto: UpdateTareaDto,
    @Req() req,
  ) {
    return this.tareasService.update(+id, updateTareaDto, req.user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una tarea' })
  @ApiResponse({ status: 200, description: 'Tarea eliminada exitosamente' })
  @ApiResponse({ status: 404, description: 'Tarea no encontrada' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  remove(@Param('id') id: string, @Req() req) {
    return this.tareasService.remove(+id, req.user);
  }
}
