import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm"
import { Proyecto } from "../../proyectos/entities/proyecto.entity"
import { Agenda } from "../../agendas/entities/agenda.entity"
import { BaseEntity } from "../../common/base.entity"

@Entity("tareas")
export class Tarea extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  titulo: string

  @Column({ type: "text", nullable: true })
  descripcion: string

  @Column({ type: "date" })
  fecha: Date

  @Column({ default: true })
  recordatorio: boolean

  @ManyToOne(
    () => Proyecto,
    (proyecto) => proyecto.tareas,
    { onDelete: "CASCADE" },
  )
  @JoinColumn({ name: "proyecto_id" })
  proyecto: Proyecto

  @Column()
  proyecto_id: number

  @OneToMany(
    () => Agenda,
    (agenda) => agenda.tarea,
  )
  agendas: Agenda[]
}
