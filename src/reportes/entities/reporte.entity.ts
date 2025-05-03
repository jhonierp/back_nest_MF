import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm"
import { Proyecto } from "../../proyectos/entities/proyecto.entity"
import { FormatoReporte } from "../../formatos-reporte/entities/formato-reporte.entity"
import { BaseEntity } from "../../common/base.entity"

@Entity("reportes")
export class Reporte extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  titulo: string

  @Column({ type: "date" })
  fecha_inicio: Date

  @Column({ type: "date" })
  fecha_fin: Date

  @Column({ type: "json" })
  datos: object

  @Column({ nullable: true })
  archivo_url: string

  @ManyToOne(
    () => Proyecto,
    (proyecto) => proyecto.reportes,
    { onDelete: "CASCADE" },
  )
  @JoinColumn({ name: "proyecto_id" })
  proyecto: Proyecto

  @Column()
  proyecto_id: number

  @ManyToOne(
    () => FormatoReporte,
    (formato) => formato.reportes,
  )
  @JoinColumn({ name: "formato_id" })
  formato: FormatoReporte

  @Column()
  formato_id: number
}
