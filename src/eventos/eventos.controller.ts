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
import { EventosService } from './eventos.service';
import { CreateEventoDto } from './dto/create-evento.dto';
import { UpdateEventoDto } from './dto/update-evento.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { PaginationDto } from '../common/dto/pagination.dto';

@ApiTags('Eventos')
@Controller('eventos')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class EventosController {
  constructor(private readonly eventosService: EventosService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo evento' })
  @ApiResponse({ status: 201, description: 'Evento creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  create(@Body() createEventoDto: CreateEventoDto, @Req() req: any) {
    return this.eventosService.create(createEventoDto, req.user);
  }

  @Get('proyecto/:proyectoId')
  @ApiOperation({ summary: 'Obtener eventos por proyecto' })
  @ApiResponse({ status: 200, description: 'Lista de eventos del proyecto' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'Proyecto no encontrado' })
  findByProyecto(
    @Param('proyectoId') proyectoId: string,
    @Query() paginationDto: PaginationDto,
    @Req() req,
  ) {
    return this.eventosService.findByProyecto(
      +proyectoId,
      paginationDto,
      req.user,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un evento por ID' })
  @ApiResponse({ status: 200, description: 'Evento encontrado' })
  @ApiResponse({ status: 404, description: 'Evento no encontrado' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  findOne(@Param('id') id: string, @Req() req) {
    return this.eventosService.findOne(+id, req.user);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un evento' })
  @ApiResponse({ status: 200, description: 'Evento actualizado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 404, description: 'Evento no encontrado' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  update(
    @Param('id') id: string,
    @Body() updateEventoDto: UpdateEventoDto,
    @Req() req,
  ) {
    return this.eventosService.update(+id, updateEventoDto, req.user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un evento' })
  @ApiResponse({ status: 200, description: 'Evento eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Evento no encontrado' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  remove(@Param('id') id: string, @Req() req) {
    return this.eventosService.remove(+id, req.user);
  }
}
