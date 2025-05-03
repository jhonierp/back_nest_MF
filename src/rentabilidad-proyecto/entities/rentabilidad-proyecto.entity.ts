import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm"
import { Proyecto } from "../../proyectos/entities/proyecto.entity"
import { BaseEntity } from "../../common/base.entity"

@Entity("rentabilidad_proyecto")
export class RentabilidadProyecto extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: "date" })
  fecha: Date

  @Column({ type: "decimal", precision: 10, scale: 2 })
  inversion_inicial: number

  @Column({ type: "decimal", precision: 10, scale: 2 })
  ingresos_totales: number

  @Column({ type: "decimal", precision: 10, scale: 2 })
  gastos_totales: number

  @Column({ type: "decimal", precision: 10, scale: 2 })
  rentabilidad_neta: number

  @Column({ type: "decimal", precision: 10, scale: 2 })
  roi: number

  @ManyToOne(
    () => Proyecto,
    (proyecto) => proyecto.rentabilidades,
    { onDelete: "CASCADE" },
  )
  @JoinColumn({ name: "proyecto_id" })
  proyecto: Proyecto

  @Column()
  proyecto_id: number
}
