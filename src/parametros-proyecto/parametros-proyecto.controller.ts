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
import { ParametrosProyectoService } from './parametros-proyecto.service';
import { CreateParametroProyectoDto } from './dto/create-parametro-proyecto.dto';
import { UpdateParametroProyectoDto } from './dto/update-parametro-proyecto.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { PaginationDto } from '../common/dto/pagination.dto';

@ApiTags('Parámetros de Proyecto')
@Controller('parametros-proyecto')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ParametrosProyectoController {
  constructor(
    private readonly parametrosProyectoService: ParametrosProyectoService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo parámetro de proyecto' })
  @ApiResponse({ status: 201, description: 'Parámetro creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  create(
    @Body() createParametroProyectoDto: CreateParametroProyectoDto,
    @Req() req,
  ) {
    const metroProyectoDto = {}; // Replace with the actual value or object
    return this.parametrosProyectoService.create(
      createParametroProyectoDto,
      metroProyectoDto,
      req.user,
    );
  }

  @Get('proyecto/:proyectoId')
  @ApiOperation({ summary: 'Obtener parámetros por proyecto' })
  @ApiResponse({ status: 200, description: 'Lista de parámetros del proyecto' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'Proyecto no encontrado' })
  findByProyecto(
    @Param('proyectoId') proyectoId: string,
    @Query() paginationDto: PaginationDto,
    @Req() req,
  ) {
    return this.parametrosProyectoService.findByProyecto(
      +proyectoId,
      paginationDto,
      req.user,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un parámetro por ID' })
  @ApiResponse({ status: 200, description: 'Parámetro encontrado' })
  @ApiResponse({ status: 404, description: 'Parámetro no encontrado' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  findOne(@Param('id') id: string, @Req() req) {
    return this.parametrosProyectoService.findOne(+id, req.user);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un parámetro' })
  @ApiResponse({
    status: 200,
    description: 'Parámetro actualizado exitosamente',
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 404, description: 'Parámetro no encontrado' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  update(
    @Param('id') id: string,
    @Body() updateParametroProyectoDto: UpdateParametroProyectoDto,
    @Req() req,
  ) {
    return this.parametrosProyectoService.update(
      +id,
      updateParametroProyectoDto,
      req.user,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un parámetro' })
  @ApiResponse({ status: 200, description: 'Parámetro eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Parámetro no encontrado' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  remove(@Param('id') id: string, @Req() req) {
    return this.parametrosProyectoService.remove(+id, req.user);
  }
}
