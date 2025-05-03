import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { Reporte } from "../../reportes/entities/reporte.entity"
import { BaseEntity } from "../../common/base.entity"

@Entity("formatos_reporte")
export class FormatoReporte extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  nombre: string

  @Column({ type: "text" })
  estructura: string

  @Column({ nullable: true })
  descripcion: string

  @OneToMany(
    () => Reporte,
    (reporte) => reporte.formato,
  )
  reportes: Reporte[]
}
