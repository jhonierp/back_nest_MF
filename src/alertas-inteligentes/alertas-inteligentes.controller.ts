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
import { AlertasInteligentesService } from './alertas-inteligentes.service';
import { CreateAlertaInteligenteDto } from './dto/create-alerta-inteligente.dto';
import { UpdateAlertaInteligenteDto } from './dto/update-alerta-inteligente.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { PaginationDto } from '../common/dto/pagination.dto';

@ApiTags('Alertas Inteligentes')
@Controller('alertas-inteligentes')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AlertasInteligentesController {
  constructor(
    private readonly alertasInteligentesService: AlertasInteligentesService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva alerta inteligente' })
  @ApiResponse({ status: 201, description: 'Alerta creada exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  create(
    @Body() createAlertaInteligenteDto: CreateAlertaInteligenteDto,
    @Req() req,
  ) {
    return this.alertasInteligentesService.create(
      createAlertaInteligenteDto,
      req.user,
    );
  }

  @Get('proyecto/:proyectoId')
  @ApiOperation({ summary: 'Obtener alertas por proyecto' })
  @ApiResponse({ status: 200, description: 'Lista de alertas del proyecto' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'Proyecto no encontrado' })
  findByProyecto(
    @Param('proyectoId') proyectoId: string,
    @Query() paginationDto: PaginationDto,
    @Req() req,
  ) {
    return this.alertasInteligentesService.findByProyecto(
      +proyectoId,
      paginationDto,
      req.user,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una alerta por ID' })
  @ApiResponse({ status: 200, description: 'Alerta encontrada' })
  @ApiResponse({ status: 404, description: 'Alerta no encontrada' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  findOne(@Param('id') id: string, @Req() req) {
    return this.alertasInteligentesService.findOne(+id, req.user);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una alerta' })
  @ApiResponse({ status: 200, description: 'Alerta actualizada exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 404, description: 'Alerta no encontrada' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  update(
    @Param('id') id: string,
    @Body() updateAlertaInteligenteDto: UpdateAlertaInteligenteDto,
    @Req() req,
  ) {
    return this.alertasInteligentesService.update(
      +id,
      updateAlertaInteligenteDto,
      req.user,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una alerta' })
  @ApiResponse({ status: 200, description: 'Alerta eliminada exitosamente' })
  @ApiResponse({ status: 404, description: 'Alerta no encontrada' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  remove(@Param('id') id: string, @Req() req) {
    return this.alertasInteligentesService.remove(+id, req.user);
  }
}
