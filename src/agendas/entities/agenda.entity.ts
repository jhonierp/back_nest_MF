import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm"
import { Proyecto } from "../../proyectos/entities/proyecto.entity"
import { Tarea } from "../../tareas/entities/tarea.entity"
import { Evento } from "../../eventos/entities/evento.entity"
import { BaseEntity } from "../../common/base.entity"

@Entity("agendas")
export class Agenda extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: "date" })
  fecha: Date

  @Column({ type: "enum", enum: ["tarea", "evento"] })
  tipo: string

  @ManyToOne(
    () => Proyecto,
    (proyecto) => proyecto.agendas,
    { onDelete: "CASCADE" },
  )
  @JoinColumn({ name: "proyecto_id" })
  proyecto: Proyecto

  @Column()
  proyecto_id: number

  @ManyToOne(
    () => Tarea,
    (tarea) => tarea.agendas,
    { nullable: true },
  )
  @JoinColumn({ name: "tarea_id" })
  tarea: Tarea

  @Column({ nullable: true })
  tarea_id: number

  @ManyToOne(
    () => Evento,
    (evento) => evento.agendas,
    { nullable: true },
  )
  @JoinColumn({ name: "evento_id" })
  evento: Evento

  @Column({ nullable: true })
  evento_id: number
}
