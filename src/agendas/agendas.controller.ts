import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Req } from "@nestjs/common"
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from "@nestjs/swagger"
import type { AgendasService } from "./agendas.service"
import type { CreateAgendaDto } from "./dto/create-agenda.dto"
import type { UpdateAgendaDto } from "./dto/update-agenda.dto"
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard"
import type { PaginationDto } from "../common/dto/pagination.dto"

@ApiTags("Agendas")
@Controller("agendas")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AgendasController {
  constructor(private readonly agendasService: AgendasService) {}

  @Post()
  @ApiOperation({ summary: "Crear una nueva agenda" })
  @ApiResponse({ status: 201, description: "Agenda creada exitosamente" })
  @ApiResponse({ status: 400, description: "Datos inválidos" })
  @ApiResponse({ status: 401, description: "No autorizado" })
  create(@Body() createAgendaDto: CreateAgendaDto, @Req() req: any) {
    return this.agendasService.create(createAgendaDto, req.user)
  }

  @Get("proyecto/:proyectoId")
  @ApiOperation({ summary: "Obtener agendas por proyecto" })
  @ApiResponse({ status: 200, description: "Lista de agendas del proyecto" })
  @ApiResponse({ status: 401, description: "No autorizado" })
  @ApiResponse({ status: 404, description: "Proyecto no encontrado" })
  findByProyecto(@Param("proyectoId") proyectoId: string, @Query() paginationDto: PaginationDto, @Req() req) {
    return this.agendasService.findByProyecto(+proyectoId, paginationDto, req.user)
  }

  @Get("fechas/:fechaInicio/:fechaFin")
  @ApiOperation({ summary: "Obtener agendas por rango de fechas" })
  @ApiResponse({ status: 200, description: "Lista de agendas por fechas" })
  @ApiResponse({ status: 401, description: "No autorizado" })
  findByFechas(@Param("fechaInicio") fechaInicio: string, @Param("fechaFin") fechaFin: string, @Req() req) {
    return this.agendasService.findByFechas(fechaInicio, fechaFin, req.user)
  }

  @Get(":id")
  @ApiOperation({ summary: "Obtener una agenda por ID" })
  @ApiResponse({ status: 200, description: "Agenda encontrada" })
  @ApiResponse({ status: 404, description: "Agenda no encontrada" })
  @ApiResponse({ status: 401, description: "No autorizado" })
  findOne(@Param("id") id: string, @Req() req) {
    return this.agendasService.findOne(+id, req.user)
  }

  @Patch(":id")
  @ApiOperation({ summary: "Actualizar una agenda" })
  @ApiResponse({ status: 200, description: "Agenda actualizada exitosamente" })
  @ApiResponse({ status: 400, description: "Datos inválidos" })
  @ApiResponse({ status: 404, description: "Agenda no encontrada" })
  @ApiResponse({ status: 401, description: "No autorizado" })
  update(@Param("id") id: string, @Body() updateAgendaDto: UpdateAgendaDto, @Req() req) {
    return this.agendasService.update(+id, updateAgendaDto, req.user)
  }

  @Delete(":id")
  @ApiOperation({ summary: "Eliminar una agenda" })
  @ApiResponse({ status: 200, description: "Agenda eliminada exitosamente" })
  @ApiResponse({ status: 404, description: "Agenda no encontrada" })
  @ApiResponse({ status: 401, description: "No autorizado" })
  remove(@Param("id") id: string, @Req() req) {
    return this.agendasService.remove(+id, req.user)
  }
}
