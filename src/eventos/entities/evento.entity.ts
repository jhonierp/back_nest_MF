import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm"
import { Proyecto } from "../../proyectos/entities/proyecto.entity"
import { TipoEvento } from "../../tipos-evento/entities/tipo-evento.entity"
import { Agenda } from "../../agendas/entities/agenda.entity"
import { BaseEntity } from "../../common/base.entity"

@Entity("eventos")
export class Evento extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: "text" })
  descripcion: string

  @Column({ type: "date" })
  fecha_evento: Date

  @Column({ default: false })
  tiene_gasto: boolean

  @Column({ nullable: true })
  gasto_id: number

  @ManyToOne(
    () => Proyecto,
    (proyecto) => proyecto.eventos,
    { onDelete: "CASCADE" },
  )
  @JoinColumn({ name: "proyecto_id" })
  proyecto: Proyecto

  @Column()
  proyecto_id: number

  @ManyToOne(
    () => TipoEvento,
    (tipoEvento) => tipoEvento.eventos,
  )
  @JoinColumn({ name: "tipo_evento_id" })
  tipo_evento: TipoEvento

  @Column()
  tipo_evento_id: number

  @OneToMany(
    () => Agenda,
    (agenda) => agenda.evento,
  )
  agendas: Agenda[]
}
