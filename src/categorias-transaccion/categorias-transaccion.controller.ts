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
import { CategoriasTransaccionService } from './categorias-transaccion.service';
import { CreateCategoriaTransaccionDto } from './dto/create-categoria-transaccion.dto';
import { UpdateCategoriaTransaccionDto } from './dto/update-categoria-transaccion.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { PaginationDto } from '../common/dto/pagination.dto';

@ApiTags('Categorías de Transacción')
@Controller('categorias-transaccion')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class CategoriasTransaccionController {
  constructor(
    private readonly categoriasTransaccionService: CategoriasTransaccionService,
  ) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Crear una nueva categoría de transacción' })
  @ApiResponse({ status: 201, description: 'Categoría creada exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Prohibido - No tiene permisos' })
  create(@Body() createCategoriaTransaccionDto: CreateCategoriaTransaccionDto) {
    return this.categoriasTransaccionService.create(
      createCategoriaTransaccionDto,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las categorías de transacción' })
  @ApiResponse({ status: 200, description: 'Lista de categorías' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.categoriasTransaccionService.findAll(paginationDto);
  }

  @Get('tipo/:tipo')
  @ApiOperation({ summary: 'Obtener categorías por tipo (ingreso/egreso)' })
  @ApiResponse({ status: 200, description: 'Lista de categorías por tipo' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  findByTipo(
    @Param('tipo') tipo: string,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.categoriasTransaccionService.findByTipo(tipo, paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una categoría por ID' })
  @ApiResponse({ status: 200, description: 'Categoría encontrada' })
  @ApiResponse({ status: 404, description: 'Categoría no encontrada' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  findOne(@Param('id') id: string) {
    return this.categoriasTransaccionService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Actualizar una categoría' })
  @ApiResponse({
    status: 200,
    description: 'Categoría actualizada exitosamente',
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 404, description: 'Categoría no encontrada' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Prohibido - No tiene permisos' })
  update(
    @Param('id') id: string,
    @Body() updateCategoriaTransaccionDto: UpdateCategoriaTransaccionDto,
  ) {
    return this.categoriasTransaccionService.update(
      +id,
      updateCategoriaTransaccionDto,
    );
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Eliminar una categoría' })
  @ApiResponse({ status: 200, description: 'Categoría eliminada exitosamente' })
  @ApiResponse({ status: 404, description: 'Categoría no encontrada' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Prohibido - No tiene permisos' })
  remove(@Param('id') id: string) {
    return this.categoriasTransaccionService.remove(+id);
  }
}
