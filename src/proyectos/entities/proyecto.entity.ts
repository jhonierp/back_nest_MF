import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from "typeorm"
import { Usuario } from "../../usuarios/entities/usuario.entity"
import { Modulo } from "../../modulos/entities/modulo.entity"
import { Submodulo } from "../../submodulos/entities/submodulo.entity"
import { ParametroProyecto } from "../../parametros-proyecto/entities/parametro-proyecto.entity"
import { RentabilidadProyecto } from "../../rentabilidad-proyecto/entities/rentabilidad-proyecto.entity"
import { Tarea } from "../../tareas/entities/tarea.entity"
import { Evento } from "../../eventos/entities/evento.entity"
import { Transaccion } from "../../transacciones/entities/transaccion.entity"
import { Reporte } from "../../reportes/entities/reporte.entity"
import { AlertaInteligente } from "../../alertas-inteligentes/entities/alerta-inteligente.entity"
import { Agenda } from "../../agendas/entities/agenda.entity"
import { BaseEntity } from "../../common/base.entity"

@Entity("proyectos")
export class Proyecto extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  nombre: string

  @Column({ nullable: true })
  ubicacion: string

  @Column({ type: "date" })
  fecha_inicio: Date

  @ManyToOne(
    () => Usuario,
    (usuario) => usuario.proyectos,
  )
  @JoinColumn({ name: "usuario_id" })
  usuario: Usuario

  @Column()
  usuario_id: number

  @ManyToOne(() => Modulo)
  @JoinColumn({ name: "modulo_id" })
  modulo: Modulo

  @Column()
  modulo_id: number

  @ManyToOne(() => Submodulo)
  @JoinColumn({ name: "submodulo_id" })
  submodulo: Submodulo

  @Column()
  submodulo_id: number

  @OneToMany(
    () => ParametroProyecto,
    (parametro) => parametro.proyecto,
  )
  parametros: ParametroProyecto[]

  @OneToMany(
    () => RentabilidadProyecto,
    (rentabilidad) => rentabilidad.proyecto,
  )
  rentabilidades: RentabilidadProyecto[]

  @OneToMany(
    () => Tarea,
    (tarea) => tarea.proyecto,
  )
  tareas: Tarea[]

  @OneToMany(
    () => Evento,
    (evento) => evento.proyecto,
  )
  eventos: Evento[]

  @OneToMany(
    () => Transaccion,
    (transaccion) => transaccion.proyecto,
  )
  transacciones: Transaccion[]

  @OneToMany(
    () => Reporte,
    (reporte) => reporte.proyecto,
  )
  reportes: Reporte[]

  @OneToMany(
    () => AlertaInteligente,
    (alerta) => alerta.proyecto,
  )
  alertas: AlertaInteligente[]

  @OneToMany(
    () => Agenda,
    (agenda) => agenda.proyecto,
  )
  agendas: Agenda[]
}
