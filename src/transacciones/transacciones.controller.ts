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
import { TransaccionesService } from './transacciones.service';
import { CreateTransaccionDto } from './dto/create-transaccion.dto';
import { UpdateTransaccionDto } from './dto/update-transaccion.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { PaginationDto } from '../common/dto/pagination.dto';

@ApiTags('Transacciones')
@Controller('transacciones')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class TransaccionesController {
  constructor(private readonly transaccionesService: TransaccionesService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva transacción' })
  @ApiResponse({ status: 201, description: 'Transacción creada exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  create(
    @Body() createTransaccionDto: CreateTransaccionDto,
    @Req() req,
  ): Promise<any> {
    return this.transaccionesService.create(createTransaccionDto, req.user);
  }

  @Get('proyecto/:proyectoId')
  @ApiOperation({ summary: 'Obtener transacciones por proyecto' })
  @ApiResponse({
    status: 200,
    description: 'Lista de transacciones del proyecto',
  })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'Proyecto no encontrado' })
  findByProyecto(
    @Param('proyectoId') proyectoId: string,
    @Query() paginationDto: PaginationDto,
    @Req() req,
  ) {
    return this.transaccionesService.findByProyecto(
      +proyectoId,
      paginationDto,
      req.user,
    );
  }

  @Get('proyecto/:proyectoId/fechas/:fechaInicio/:fechaFin')
  @ApiOperation({
    summary: 'Obtener transacciones por proyecto y rango de fechas',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de transacciones por fechas',
  })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'Proyecto no encontrado' })
  findByProyectoAndFechas(
    @Param('proyectoId') proyectoId: string,
    @Param('fechaInicio') fechaInicio: string,
    @Param('fechaFin') fechaFin: string,
    @Req() req,
  ) {
    return this.transaccionesService.findByProyectoAndFechas(
      +proyectoId,
      fechaInicio,
      fechaFin,
      req.user,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una transacción por ID' })
  @ApiResponse({ status: 200, description: 'Transacción encontrada' })
  @ApiResponse({ status: 404, description: 'Transacción no encontrada' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  findOne(@Param('id') id: string, @Req() req) {
    return this.transaccionesService.findOne(+id, req.user);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una transacción' })
  @ApiResponse({
    status: 200,
    description: 'Transacción actualizada exitosamente',
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 404, description: 'Transacción no encontrada' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  update(
    @Param('id') id: string,
    @Body() updateTransaccionDto: UpdateTransaccionDto,
    @Req() req,
  ) {
    return this.transaccionesService.update(
      +id,
      updateTransaccionDto,
      req.user,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una transacción' })
  @ApiResponse({
    status: 200,
    description: 'Transacción eliminada exitosamente',
  })
  @ApiResponse({ status: 404, description: 'Transacción no encontrada' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  remove(@Param('id') id: string, @Req() req) {
    return this.transaccionesService.remove(+id, req.user);
  }
}
