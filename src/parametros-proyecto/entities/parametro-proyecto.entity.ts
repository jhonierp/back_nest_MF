import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm"
import { Proyecto } from "../../proyectos/entities/proyecto.entity"
import { BaseEntity } from "../../common/base.entity"

@Entity("parametros_proyecto")
export class ParametroProyecto extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  parametro_nombre: string

  @Column()
  valor: string

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  ideal_min: number

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  ideal_max: number

  @Column({ type: "text", nullable: true })
  descripcion: string

  @ManyToOne(
    () => Proyecto,
    (proyecto) => proyecto.parametros,
    { onDelete: "CASCADE" },
  )
  @JoinColumn({ name: "proyecto_id" })
  proyecto: Proyecto

  @Column()
  proyecto_id: number
}
