import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { TiposEventoService } from './tipos-evento.service';
import { CreateTipoEventoDto } from './dto/create-tipo-evento.dto';
import { UpdateTipoEventoDto } from './dto/update-tipo-evento.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@ApiTags('Tipos de Evento')
@Controller('tipos-evento')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class TiposEventoController {
  constructor(private readonly tiposEventoService: TiposEventoService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Crear un nuevo tipo de evento' })
  @ApiResponse({
    status: 201,
    description: 'Tipo de evento creado exitosamente',
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Prohibido - No tiene permisos' })
  create(@Body() createTipoEventoDto: CreateTipoEventoDto) {
    return this.tiposEventoService.create(createTipoEventoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los tipos de evento' })
  @ApiResponse({ status: 200, description: 'Lista de tipos de evento' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  findAll() {
    return this.tiposEventoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un tipo de evento por ID' })
  @ApiResponse({ status: 200, description: 'Tipo de evento encontrado' })
  @ApiResponse({ status: 404, description: 'Tipo de evento no encontrado' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  s(@Param('id') id: string) {
    return this.tiposEventoService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Actualizar un tipo de evento' })
  @ApiResponse({
    status: 200,
    description: 'Tipo de evento actualizado exitosamente',
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 404, description: 'Tipo de evento no encontrado' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Prohibido - No tiene permisos' })
  update(
    @Param('id') id: string,
    @Body() updateTipoEventoDto: UpdateTipoEventoDto,
  ) {
    return this.tiposEventoService.update(+id, updateTipoEventoDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Eliminar un tipo de evento' })
  @ApiResponse({
    status: 200,
    description: 'Tipo de evento eliminado exitosamente',
  })
  @ApiResponse({ status: 404, description: 'Tipo de evento no encontrado' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Prohibido - No tiene permisos' })
  remove(@Param('id') id: string) {
    return this.tiposEventoService.remove(+id);
  }
}
