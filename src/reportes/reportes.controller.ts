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
import { ReportesService } from './reportes.service';
import { CreateReporteDto } from './dto/create-reporte.dto';
import { UpdateReporteDto } from './dto/update-reporte.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { PaginationDto } from '../common/dto/pagination.dto';

@ApiTags('Reportes')
@Controller('reportes')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ReportesController {
  constructor(private readonly reportesService: ReportesService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo reporte' })
  @ApiResponse({ status: 201, description: 'Reporte creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  create(@Body() createReporteDto: CreateReporteDto, @Req() req) {
    return this.reportesService.create(createReporteDto, req.user);
  }

  @Get('proyecto/:proyectoId')
  @ApiOperation({ summary: 'Obtener reportes por proyecto' })
  @ApiResponse({ status: 200, description: 'Lista de reportes del proyecto' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'Proyecto no encontrado' })
  findByProyecto(
    @Param('proyectoId') proyectoId: string,
    @Query() paginationDto: PaginationDto,
    @Req() req,
  ) {
    return this.reportesService.findByProyecto(
      +proyectoId,
      paginationDto,
      req.user,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un reporte por ID' })
  @ApiResponse({ status: 200, description: 'Reporte encontrado' })
  @ApiResponse({ status: 404, description: 'Reporte no encontrado' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  findOne(@Param('id') id: string, @Req() req) {
    return this.reportesService.findOne(+id, req.user);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un reporte' })
  @ApiResponse({ status: 200, description: 'Reporte actualizado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 404, description: 'Reporte no encontrado' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  update(
    @Param('id') id: string,
    @Body() updateReporteDto: UpdateReporteDto,
    @Req() req,
  ) {
    return this.reportesService.update(+id, updateReporteDto, req.user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un reporte' })
  @ApiResponse({ status: 200, description: 'Reporte eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Reporte no encontrado' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  remove(@Param('id') id: string, @Req() req) {
    return this.reportesService.remove(+id, req.user);
  }
}
