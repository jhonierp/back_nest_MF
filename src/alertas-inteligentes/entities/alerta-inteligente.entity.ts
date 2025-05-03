import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm"
import { Proyecto } from "../../proyectos/entities/proyecto.entity"
import { BaseEntity } from "../../common/base.entity"

@Entity("alertas_inteligentes")
export class AlertaInteligente extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  nombre: string

  @Column({ type: "text" })
  condicion: string

  @Column({ type: "text" })
  mensaje: string

  @Column({ default: true })
  activa: boolean

  @ManyToOne(
    () => Proyecto,
    (proyecto) => proyecto.alertas,
    { onDelete: "CASCADE" },
  )
  @JoinColumn({ name: "proyecto_id" })
  proyecto: Proyecto

  @Column()
  proyecto_id: number
}
