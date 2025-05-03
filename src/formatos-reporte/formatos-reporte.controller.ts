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
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { FormatosReporteService } from './formatos-reporte.service';
import { CreateFormatoReporteDto } from './dto/create-formato-reporte.dto';
import { UpdateFormatoReporteDto } from './dto/update-formato-reporte.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { PaginationDto } from '../common/dto/pagination.dto';

@ApiTags('Formatos de Reporte')
@Controller('formatos-reporte')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class FormatosReporteController {
  constructor(
    private readonly formatosReporteService: FormatosReporteService,
  ) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Crear un nuevo formato de reporte' })
  @ApiResponse({ status: 201, description: 'Formato creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Prohibido - No tiene permisos' })
  @Post()
  create(@Body() createFormatoReporteDto: CreateFormatoReporteDto) {
    return this.formatosReporteService.create(createFormatoReporteDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los formatos de reporte' })
  @ApiResponse({ status: 200, description: 'Lista de formatos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.formatosReporteService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un formato de reporte por ID' })
  @ApiResponse({ status: 200, description: 'Formato encontrado' })
  @ApiResponse({ status: 404, description: 'Formato no encontrado' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  findOne(@Param('id') id: string) {
    return this.formatosReporteService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Actualizar un formato de reporte' })
  @ApiResponse({ status: 200, description: 'Formato actualizado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 404, description: 'Formato no encontrado' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Prohibido - No tiene permisos' })
  update(
    @Param('id') id: string,
    @Body() updateFormatoReporteDto: UpdateFormatoReporteDto,
  ) {
    return this.formatosReporteService.update(+id, updateFormatoReporteDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Eliminar un formato de reporte' })
  @ApiResponse({ status: 200, description: 'Formato eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Formato no encontrado' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Prohibido - No tiene permisos' })
  remove(@Param('id') id: string) {
    return this.formatosReporteService.remove(+id);
  }
}
