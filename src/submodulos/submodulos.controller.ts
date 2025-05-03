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
import { SubmodulosService } from './submodulos.service';
import { CreateSubmoduloDto } from './dto/create-submodulo.dto';
import { UpdateSubmoduloDto } from './dto/update-submodulo.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { PaginationDto } from '../common/dto/pagination.dto';

@ApiTags('Submódulos')
@Controller('submodulos')
export class SubmodulosController {
  constructor(private readonly submodulosService: SubmodulosService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear un nuevo submódulo' })
  @ApiResponse({ status: 201, description: 'Submódulo creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Prohibido - No tiene permisos' })
  create(@Body() createSubmoduloDto: CreateSubmoduloDto) {
    return this.submodulosService.create(createSubmoduloDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener todos los submódulos' })
  @ApiResponse({ status: 200, description: 'Lista de submódulos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.submodulosService.findAll(paginationDto);
  }

  @Get('modulo/:moduloId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener submódulos por módulo' })
  @ApiResponse({ status: 200, description: 'Lista de submódulos por módulo' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  findByModulo(
    @Param('moduloId') moduloId: string,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.submodulosService.findByModulo(+moduloId, paginationDto);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener un submódulo por ID' })
  @ApiResponse({ status: 200, description: 'Submódulo encontrado' })
  @ApiResponse({ status: 404, description: 'Submódulo no encontrado' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  findOne(@Param('id') id: string) {
    return this.submodulosService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar un submódulo' })
  @ApiResponse({
    status: 200,
    description: 'Submódulo actualizado exitosamente',
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 404, description: 'Submódulo no encontrado' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Prohibido - No tiene permisos' })
  update(
    @Param('id') id: string,
    @Body() updateSubmoduloDto: UpdateSubmoduloDto,
  ) {
    return this.submodulosService.update(+id, updateSubmoduloDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar un submódulo' })
  @ApiResponse({ status: 200, description: 'Submódulo eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Submódulo no encontrado' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Prohibido - No tiene permisos' })
  remove(@Param('id') id: string) {
    return this.submodulosService.remove(+id);
  }
}
